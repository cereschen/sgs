import { CardChoosingOptions, CardId } from 'core/cards/libs/card_props';
import {
  ClientEventFinder,
  EventPacker,
  GameEventIdentifiers,
  ServerEventFinder,
} from 'core/event/event';
import { INFINITE_TRIGGERING_TIMES } from 'core/game/game_props';
import { PlayerCardsArea, PlayerId } from 'core/player/player_props';
import { Room } from 'core/room/room';
import { ActiveSkill, CommonSkill, TriggerableTimes } from 'core/skills/skill';

@CommonSkill
@TriggerableTimes(INFINITE_TRIGGERING_TIMES)
export class ShunShouQianYangSkill extends ActiveSkill {
  constructor() {
    super('shunshouqianyang', 'shunshouqianyang_description');
  }
  public canUse() {
    return true;
  }

  public targetFilter(room: Room, targets: PlayerId[]): boolean {
    return targets.length === 1;
  }
  public cardFilter(): boolean {
    return true;
  }
  public isAvailableCard(): boolean {
    return false;
  }
  public isAvailableTarget(
    owner: PlayerId,
    room: Room,
    target: PlayerId,
    selectedTargets: PlayerId[],
    containerCard: CardId,
  ): boolean {
    const from = room.getPlayerById(owner);
    const to = room.getPlayerById(target);

    return (
      target !== owner &&
      from.canUseCardTo(room, containerCard, target) &&
      to.getCardIds().length > 0 &&
      room.distanceBetween(from, to) <= 1
    );
  }

  public async onUse(
    room: Room,
    event: ClientEventFinder<GameEventIdentifiers.CardUseEvent>,
  ) {
    return true;
  }

  public async onEffect(
    room: Room,
    event: ServerEventFinder<GameEventIdentifiers.CardEffectEvent>,
  ) {
    const to = room.getPlayerById(event.toIds![0]);
    const options: CardChoosingOptions = {
      [PlayerCardsArea.JudgeArea]: to.getCardIds(PlayerCardsArea.JudgeArea),
      [PlayerCardsArea.EquipArea]: to.getCardIds(PlayerCardsArea.EquipArea),
      [PlayerCardsArea.HandArea]: to.getCardIds(PlayerCardsArea.HandArea)
        .length,
    };

    const chooseCardEvent = {
      fromId: event.fromId!,
      toId: to.Id,
      options,
    };

    room.notify(
      GameEventIdentifiers.AskForChoosingCardFromPlayerEvent,
      EventPacker.createUncancellableEvent<
        GameEventIdentifiers.AskForChoosingCardFromPlayerEvent
      >(chooseCardEvent),
      event.fromId!,
    );

    const response = await room.onReceivingAsyncReponseFrom(
      GameEventIdentifiers.AskForChoosingCardFromPlayerEvent,
      event.fromId!,
    );

    if (response.selectedCard === undefined) {
      response.selectedCard = to.getCardIds(PlayerCardsArea.HandArea)[
        response.selectedCardIndex!
      ];
    }

    await room.moveCard(
      response.selectedCard,
      chooseCardEvent.toId,
      chooseCardEvent.fromId,
      response.fromArea,
      PlayerCardsArea.HandArea,
      chooseCardEvent.fromId,
    );
    return true;
  }
}