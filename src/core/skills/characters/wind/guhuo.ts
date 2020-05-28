import { Card, CardType, VirtualCard } from 'core/cards/card';
import { CardId, CardSuit } from 'core/cards/libs/card_props';
import {
  CardMoveArea,
  CardMoveReason,
  ClientEventFinder,
  EventPacker,
  GameEventIdentifiers,
  ServerEventFinder,
} from 'core/event/event';
import { Sanguosha } from 'core/game/engine';
import { AllStage, CardResponseStage, CardUseStage, PlayerPhase } from 'core/game/stage_processor';
import { Player } from 'core/player/player';
import { PlayerCardsArea } from 'core/player/player_props';
import { Room } from 'core/room/room';
import { Precondition } from 'core/shares/libs/precondition/precondition';
import { CommonSkill, TriggerSkill, ViewAsSkill } from 'core/skills/skill';
import { ShadowSkill } from 'core/skills/skill_wrappers';
import { TranslationPack } from 'core/translations/translation_json_tool';
import { ChanYuan } from './chanyuan';

@CommonSkill({ name: 'guhuo', description: 'guhuo_description' })
export class GuHuo extends ViewAsSkill {
  public canViewAs(): string[] {
    return Sanguosha.getCardNameByType(
      types =>
        (types.includes(CardType.Trick) || types.includes(CardType.Basic)) && !types.includes(CardType.DelayedTrick),
    );
  }

  isRefreshAt(phase: PlayerPhase) {
    return phase === PlayerPhase.PrepareStage;
  }

  public canUse(room: Room, owner: Player): boolean {
    return !owner.hasUsedSkill(this.Name) && owner.getCardIds(PlayerCardsArea.HandArea).length > 0;
  }

  public cardFilter(room: Room, owner: Player, cards: CardId[]): boolean {
    return cards.length === 1;
  }

  public isAvailableCard(room: Room, owner: Player, pendingCardId: CardId): boolean {
    return owner.cardFrom(pendingCardId) === PlayerCardsArea.HandArea;
  }

  public viewAs(selectedCards: CardId[], viewAs: string): VirtualCard {
    Precondition.assert(!!viewAs, 'Unknown guhuo card');
    return VirtualCard.create(
      {
        cardName: viewAs,
        bySkill: this.Name,
        cardNumber: 0,
        cardSuit: CardSuit.NoSuit,
        hideActualCard: true,
      },
      selectedCards,
    );
  }
}

@ShadowSkill
@CommonSkill({ name: GuHuo.Name, description: GuHuo.Description })
export class GuHuoShadow extends TriggerSkill {
  isAutoTrigger() {
    return true;
  }

  public isTriggerable(
    event: ServerEventFinder<GameEventIdentifiers.CardUseEvent | GameEventIdentifiers.CardResponseEvent>,
    stage?: AllStage,
  ): boolean {
    return (
      (stage === CardUseStage.PreCardUse || stage === CardResponseStage.PreCardResponse) &&
      Card.isVirtualCardId(event.cardId)
    );
  }

  public canUse(
    room: Room,
    owner: Player,
    content: ServerEventFinder<GameEventIdentifiers.CardUseEvent | GameEventIdentifiers.CardResponseEvent>,
  ): boolean {
    return (
      content.fromId === owner.Id &&
      Sanguosha.getCardById<VirtualCard>(content.cardId).GeneratedBySkill === this.GeneralName
    );
  }

  public async onTrigger(room: Room, event: ServerEventFinder<GameEventIdentifiers.SkillUseEvent>): Promise<boolean> {
    return true;
  }

  public async onEffect(room: Room, event: ServerEventFinder<GameEventIdentifiers.SkillEffectEvent>): Promise<boolean> {
    const cardEvent = event.triggeredOnEvent as ServerEventFinder<
      GameEventIdentifiers.CardUseEvent | GameEventIdentifiers.CardResponseEvent
    >;
    const preuseCard = Sanguosha.getCardById<VirtualCard>(cardEvent.cardId);
    const realCard = Sanguosha.getCardById(preuseCard.ActualCardIds[0]);
    const from = room.getPlayerById(cardEvent.fromId);

    preuseCard.Suit = realCard.Suit;
    preuseCard.CardNumber = realCard.CardNumber;

    await room.moveCards({
      movingCards: [{ card: preuseCard.Id }],
      fromId: cardEvent.fromId,
      toArea: CardMoveArea.ProcessingArea,
      moveReason: CardMoveReason.CardUse,
      movedByReason: this.GeneralName,
      hideBroadcast: true,
    });

    const chooseOptionEvent: ServerEventFinder<GameEventIdentifiers.AskForChoosingOptionsEvent> = EventPacker.createUncancellableEvent<
      GameEventIdentifiers.AskForChoosingOptionsEvent
    >({
      toId: event.fromId,
      options: ['guhuo:doubt', 'guhuo:no-doubt'],
      conversation: TranslationPack.translationJsonPatcher(
        'do you doubt the pre-use of {0} from {1}',
        TranslationPack.patchCardInTranslation(cardEvent.cardId),
        TranslationPack.patchPlayerInTranslation(from),
      ).extract(),
    });

    const askingResponses: Promise<ClientEventFinder<GameEventIdentifiers.AskForChoosingOptionsEvent>>[] = [];
    for (const player of room
      .getAlivePlayersFrom()
      .filter(player => !player.hasSkill(ChanYuan.Name) && player.Id !== cardEvent.fromId)) {
      chooseOptionEvent.toId = player.Id;
      room.notify(GameEventIdentifiers.AskForChoosingOptionsEvent, chooseOptionEvent, player.Id);
      askingResponses.push(
        room.onReceivingAsyncReponseFrom(GameEventIdentifiers.AskForChoosingOptionsEvent, player.Id),
      );
    }

    const responses = await Promise.all(askingResponses);
    const messages = responses.map(response =>
      TranslationPack.translationJsonPatcher(
        '{0} selected {1}',
        TranslationPack.patchPlayerInTranslation(room.getPlayerById(response.fromId)),
        response.selectedOption!,
      ).toString(),
    );
    messages.push(
      TranslationPack.translationJsonPatcher(
        '{0} displayed guhuo cards {1}',
        TranslationPack.patchPlayerInTranslation(from),
        TranslationPack.patchCardInTranslation(realCard.Id),
      ).toString(),
    );

    room.broadcast(GameEventIdentifiers.CustomGameDialog, {
      messages,
    });

    let success = true;
    for (const response of responses) {
      if (preuseCard.Name === realCard.Name) {
        if (response.selectedOption === 'guhuo:doubt') {
          await room.loseHp(response.fromId, 1);
          room.obtainSkill(response.fromId, ChanYuan.Name, true);
        }
      } else {
        if (response.selectedOption === 'guhuo:doubt') {
          success = false;
          await room.drawCards(1, response.fromId);
        }
      }
    }

    if (!success) {
      EventPacker.terminate(cardEvent);
      room.endProcessOnTag(preuseCard.Id.toString());
      room.bury(realCard.Id);
      return false;
    } else {
      cardEvent.cardId = preuseCard.Id;
    }

    return true;
  }
}