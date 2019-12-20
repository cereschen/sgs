import { CardId } from 'core/cards/card';
import { DamageType, GameInfo } from 'core/game/game_props';
import { PlayerId, PlayerInfo } from 'core/player/player_props';
import { Languages } from 'translations/languages';
import { EventUtilities, GameEventIdentifiers } from './event';

export interface ClientEvent extends EventUtilities {
  [GameEventIdentifiers.CardUseEvent]: {
    fromId: PlayerId;
    cardId: CardId;
    toId?: PlayerId;
  };
  [GameEventIdentifiers.CardResponseEvent]: {
    fromId: PlayerId;
    cardId: CardId;
  };
  [GameEventIdentifiers.CardDropEvent]: {
    fromId: PlayerId;
    cardIds: CardId[];
  };
  [GameEventIdentifiers.DrawCardEvent]: {};
  [GameEventIdentifiers.ObtainCardEvent]: {};
  [GameEventIdentifiers.MoveCardEvent]: {};

  [GameEventIdentifiers.SkillUseEvent]: {
    fromId: PlayerId;
    cardIds?: CardId[];
    toIds?: PlayerId[];
  };
  [GameEventIdentifiers.DamageEvent]: never;
  [GameEventIdentifiers.JudgeEvent]: {
    toId: PlayerId;
    cardId: CardId;
    judgeCardId: CardId;
  };
  [GameEventIdentifiers.RecoverEvent]: {
    fromId: PlayerId;
    toId: PlayerId;
    recover: number;
  }
  [GameEventIdentifiers.PinDianEvent]: {
    attackerId: PlayerId;
    displayedCardIdByAttacker: CardId;
    targetId: PlayerId;
    displayedCardIdByTarget: CardId;
  };

  [GameEventIdentifiers.UserMessageEvent]: {
    playerId: PlayerId;
  };

  [GameEventIdentifiers.GameCreatedEvent]: {
    gameInfo: GameInfo;
  };
  [GameEventIdentifiers.GameStartEvent]: {
    currentPlayer: PlayerInfo;
    otherPlayers: PlayerInfo[];
  };
  [GameEventIdentifiers.GameOverEvent]: {
    playersInfo: PlayerInfo[];
  };

  [GameEventIdentifiers.PlayerEnterEvent]: {
    playerName: string;
    playerLanguage: Languages;
  };
  [GameEventIdentifiers.PlayerLeaveEvent]: {
    playerId: PlayerId;
  };
  [GameEventIdentifiers.PlayerDiedEvent]: {
    playerInfo: PlayerInfo;
  };

  [GameEventIdentifiers.AskForPeachEvent]: {};
  [GameEventIdentifiers.AskForNullificationEvent]: {};
  [GameEventIdentifiers.AskForCardResponseEvent]: {};
  [GameEventIdentifiers.AskForChoosingCardEvent]: {};
  [GameEventIdentifiers.AskForChoosingCardFromPlayerEvent]: {};
  [GameEventIdentifiers.AskForInvokeEvent]: {
    eventName: string;
    invoke: boolean;
  };
  [GameEventIdentifiers.AskForCardUseEvent]: {}
  [GameEventIdentifiers.AskForCardUseEvent]: {};
  [GameEventIdentifiers.AskForCardDisplayEvent]: {};
  [GameEventIdentifiers.AskForCardDropEvent]: {};
}
