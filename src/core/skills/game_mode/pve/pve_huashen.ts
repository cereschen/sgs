import { CardType } from 'core/cards/card';
import { CardId } from 'core/cards/libs/card_props';
import { CardMoveArea, CardMoveReason, EventPacker, GameEventIdentifiers, ServerEventFinder } from 'core/event/event';
import { Sanguosha } from 'core/game/engine';
import { GameStartStage, PlayerDiedStage } from 'core/game/stage_processor';
import { AllStage } from 'core/game/stage_processor';
import { Player } from 'core/player/player';
import { PlayerCardsArea, PlayerId } from 'core/player/player_props';
import { Room } from 'core/room/room';
import { MarkEnum } from 'core/shares/types/mark_list';
import { TriggerSkill } from 'core/skills/skill';
import { CompulsorySkill, PersistentSkill } from 'core/skills/skill_wrappers';
import { PveTanSuo } from './pve_tansuo';

@PersistentSkill({ stubbornSkill: true })
@CompulsorySkill({ name: 'pve_huashen', description: 'pve_huashen_description' })
export class PveHuaShen extends TriggerSkill {
  static readonly pveEasyMode = 'pve-easy-mode';
  static readonly pveHardMode = 'pve-hard-mode';
  static readonly CHARACTERS = ['pve_suanni', 'pve_bian', 'pve_bixi', 'pve_yazi', 'pve_fuxi', 'pve_chaofeng'];

  public isAutoTrigger(): boolean {
    return true;
  }

  public isTriggerable(
    event: ServerEventFinder<GameEventIdentifiers.PlayerDiedEvent | GameEventIdentifiers.GameStartEvent>,
    stage?: AllStage,
  ): boolean {
    return stage === PlayerDiedStage.PrePlayerDied || stage === GameStartStage.AfterGameStarted;
  }

  public canUse(
    room: Room,
    owner: Player,
    event: ServerEventFinder<GameEventIdentifiers.PlayerDiedEvent | GameEventIdentifiers.GameStartEvent>,
  ): boolean {
    const identifier = EventPacker.getIdentifier(
      event as ServerEventFinder<GameEventIdentifiers.PlayerDiedEvent | GameEventIdentifiers.GameStartEvent>,
    );

    if (identifier === GameEventIdentifiers.GameStartEvent) {
      return !owner.hasUsedSkill(this.Name);
    }

    if (identifier === GameEventIdentifiers.PlayerDiedEvent) {
      return (
        (event as ServerEventFinder<GameEventIdentifiers.PlayerDiedEvent>).playerId === owner.Id &&
        room.getMark(owner.Id, MarkEnum.PveHuaShen) > 0
      );
    }

    return false;
  }

  private async nextEntity(room: Room, ownerId: PlayerId) {
    const level = PveHuaShen.CHARACTERS.length - room.getMark(ownerId, MarkEnum.PveHuaShen);
    const NewMaxHp = room.getPlayerById(ownerId).MaxHp + 1;
    const chara = PveHuaShen.CHARACTERS[level];
    room.addMark(ownerId, MarkEnum.PveHuaShen, -1);

    const charaSkills = Sanguosha.getCharacterByCharaterName(chara).Skills.filter(skill => !skill.isShadowSkill());
    const skill = charaSkills[Math.floor(charaSkills.length * Math.random())];

    const playerPropertiesChangeEvent: ServerEventFinder<GameEventIdentifiers.PlayerPropertiesChangeEvent> = {
      changedProperties: [
        {
          toId: ownerId,
          characterId: Sanguosha.getCharacterByCharaterName(chara).Id,
          maxHp: NewMaxHp,
          hp: NewMaxHp,
        },
      ],
    };

    await room.changeGeneral(playerPropertiesChangeEvent);
    const player = room.getPlayerById(ownerId);

    await room.moveCards({
      moveReason: CardMoveReason.SelfDrop,
      fromId: player.Id,
      movingCards: player.getPlayerCards().map(cardId => ({ card: cardId, fromArea: player.cardFrom(cardId) })),
      toArea: CardMoveArea.DropStack,
      movedByReason: this.Name,
      proposer: player.Id,
    });

    const outsideCards = Object.entries(player.getOutsideAreaCards()).reduce<CardId[]>(
      (allCards, [areaName, cards]) => {
        if (!player.isCharacterOutsideArea(areaName)) {
          allCards.push(...cards);
        }
        return allCards;
      },
      [],
    );

    await room.moveCards({
      moveReason: CardMoveReason.PlaceToDropStack,
      fromId: player.Id,
      movingCards: outsideCards.map(cardId => ({ card: cardId, fromArea: PlayerCardsArea.OutsideArea })),
      toArea: CardMoveArea.DropStack,
      movedByReason: this.Name,
      proposer: player.Id,
    });

    !player.isFaceUp() && (await room.turnOver(player.Id));
    player.ChainLocked && (await room.chainedOn(player.Id));
    player.clearHeaded();

    await room.drawCards(
      room.getMark(ownerId, MarkEnum.PveHuaShen) === 5 ? 0 : 10 - room.getMark(ownerId, MarkEnum.PveHuaShen),
      ownerId,
      'top',
      ownerId,
      this.Name,
    );

    await room.obtainSkill(ownerId, this.Name, true);
    await room.obtainSkill(ownerId, PveTanSuo.Name);

    if (room.getMark(ownerId, MarkEnum.PveHuaShen) === 0) {
      await room.loseSkill(
        ownerId,
        !room.getFlag(ownerId, PveHuaShen.pveHardMode) ? charaSkills[1].GeneralName : charaSkills[0].GeneralName,
        true,
      );
    } else if (charaSkills.length > 1) {
      await room.loseSkill(ownerId, skill.GeneralName, true);
    }
  }

  public async onTrigger(): Promise<boolean> {
    return true;
  }

  public async onEffect(room: Room, event: ServerEventFinder<GameEventIdentifiers.SkillEffectEvent>) {
    const identifier = EventPacker.getIdentifier(
      event.triggeredOnEvent as ServerEventFinder<
        GameEventIdentifiers.PlayerDiedEvent | GameEventIdentifiers.GameStartEvent
      >,
    );
    const longshen = room.getPlayerById(event.fromId);

    if (identifier === GameEventIdentifiers.GameStartEvent) {
      room.addMark(event.fromId, MarkEnum.PveHuaShen, PveHuaShen.CHARACTERS.length);
      await this.nextEntity(room, event.fromId);

      room.AlivePlayers.filter(player => player.Id !== event.fromId).forEach(player =>
        room.changePlayerProperties({
          changedProperties: [
            {
              toId: player.Id,
              maxHp: player.Character.MaxHp + 1,
              hp: player.Character.Hp + 1,
            },
          ],
        }),
      );
    } else {
      const { triggeredOnEvent } = event;
      EventPacker.terminate(triggeredOnEvent!);

      const otherPlayers = room.AlivePlayers.filter(player => player.Id !== event.fromId);
      for (const player of otherPlayers) {
        await room.recover({ recoverBy: event.fromId, recoveredHp: 1, toId: player.Id });
        await room.drawCards(2, player.Id, 'top');
        if (room.getMark(event.fromId, MarkEnum.PveHuaShen) === 1) {
          const bossaskForChoosingOptionsEvent: ServerEventFinder<GameEventIdentifiers.AskForChoosingOptionsEvent> = {
            options: [PveHuaShen.pveEasyMode, PveHuaShen.pveHardMode],
            toId: player.Id,
            conversation: 'pve_huashen: please announce a boss',
            triggeredBySkills: [this.Name],
          };
          room.notify(GameEventIdentifiers.AskForChoosingOptionsEvent, bossaskForChoosingOptionsEvent, player.Id);
          const response = await room.onReceivingAsyncResponseFrom(
            GameEventIdentifiers.AskForChoosingOptionsEvent,
            player.Id,
          );
          if (response.selectedOption === PveHuaShen.pveHardMode) {
            room.setFlag(event.fromId, PveHuaShen.pveHardMode, true);
          }
        }

        const pveHuashenCharacters = room.getRandomCharactersFromLoadedPackage(4);
        const askForChoosingCharacterEvent: ServerEventFinder<GameEventIdentifiers.AskForChoosingCharacterEvent> = {
          amount: 1,
          characterIds: pveHuashenCharacters,
          toId: player.Id,
          byHuaShen: true,
          triggeredBySkills: [this.Name],
        };

        room.notify(GameEventIdentifiers.AskForChoosingCharacterEvent, askForChoosingCharacterEvent, player.Id);

        const { chosenCharacterIds } = await room.onReceivingAsyncResponseFrom(
          GameEventIdentifiers.AskForChoosingCharacterEvent,
          player.Id,
        );

        const options = Sanguosha.getCharacterById(chosenCharacterIds[0])
          .Skills.filter(skill => !(skill.isShadowSkill() || skill.isLordSkill()))
          .map(skill => skill.GeneralName);

        const askForChoosingOptionsEvent: ServerEventFinder<GameEventIdentifiers.AskForChoosingOptionsEvent> = {
          options,
          toId: player.Id,
          conversation: 'pve_huashen: please announce a skill to obtain',
          triggeredBySkills: [this.Name],
        };

        room.notify(
          GameEventIdentifiers.AskForChoosingOptionsEvent,
          EventPacker.createUncancellableEvent<GameEventIdentifiers.AskForChoosingOptionsEvent>(
            askForChoosingOptionsEvent,
          ),
          player.Id,
        );

        const { selectedOption } = await room.onReceivingAsyncResponseFrom(
          GameEventIdentifiers.AskForChoosingOptionsEvent,
          player.Id,
        );

        await room.obtainSkill(player.Id, selectedOption!, true);
        if (room.getMark(event.fromId, MarkEnum.PveHuaShen) !== 0) {
          const trcard = Sanguosha.getCardNameByType(
            types => types.includes(CardType.Trick) || types.includes(CardType.Basic) || types.includes(CardType.Equip),
          );
          const upcard = Math.floor(Math.random() * 4 + 1);
          const options = [
            trcard[Math.floor(Math.random() * trcard.length)],
            trcard[Math.floor(Math.random() * trcard.length)],
            trcard[Math.floor(Math.random() * trcard.length)],
          ];
          const askForChoosingOptionsEvent: ServerEventFinder<GameEventIdentifiers.AskForChoosingOptionsEvent> = {
            options,
            toId: player.Id,
            conversation: 'pve_huashen: please make a card' + upcard,
            triggeredBySkills: [this.Name],
          };
          room.notify(
            GameEventIdentifiers.AskForChoosingOptionsEvent,
            EventPacker.createUncancellableEvent<GameEventIdentifiers.AskForChoosingOptionsEvent>(
              askForChoosingOptionsEvent,
            ),
            player.Id,
          );

          const { selectedOption } = await room.onReceivingAsyncResponseFrom(
            GameEventIdentifiers.AskForChoosingOptionsEvent,
            player.Id,
          );
          if (selectedOption) {
            const cardup = longshen.getFlag<string[]>(PveTanSuo.Name) || [];
            cardup.push(selectedOption + upcard);
            longshen.setFlag(PveTanSuo.Name, cardup);
          }
        }
      }

      await this.nextEntity(room, event.fromId);
    }
    return true;
  }
}
