import { VirtualCard } from 'core/cards/card';
import { CardMatcher } from 'core/cards/libs/card_matcher';
import { CardId } from 'core/cards/libs/card_props';
import { Jink } from 'core/cards/standard/jink';
import { Player } from 'core/player/player';
import { PlayerCardsArea } from 'core/player/player_props';
import { Room } from 'core/room/room';
import { CommonSkill, ViewAsSkill } from 'core/skills/skill';
import { Sanguosha } from 'core/game/engine';

@CommonSkill
export class QingGuo extends ViewAsSkill {
  constructor() {
    super('qingguo', 'qingguo_description');
  }

  public canViewAs(): string[] {
    return ['jink'];
  }
  public canUse(room: Room, owner: Player) {
    return owner.canUseCard(room, new CardMatcher({ name: ['jink'] }));
  }

  public cardFilter(room: Room, owner: Player, cards: CardId[]): boolean {
    return cards.length === 1;
  }
  public isAvailableCard(
    room: Room,
    owner: Player,
    pendingCardId: CardId,
    selectedCards: CardId[],
    containerCard?: CardId | undefined,
  ): boolean {
    return Sanguosha.getCardById(pendingCardId).isBlack() && owner.cardFrom(pendingCardId) === PlayerCardsArea.HandArea;
  }

  public viewAs(selectedCards: CardId[]) {
    return VirtualCard.create<Jink>(
      {
        cardName: 'jink',
        bySkill: this.name,
      },
      selectedCards,
    );
  }
}