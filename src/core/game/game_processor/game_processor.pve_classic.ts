import { PlayerCardsArea, PlayerId, PlayerInfo, PlayerRole } from 'core/player/player_props';
import { StandardGameProcessor } from './game_processor.standard';
import { Player } from 'core/player/player';
import { Sanguosha } from '../engine';
import {
  CardDrawReason,
  CardMoveArea,
  CardMoveReason,
  ClientEventFinder,
  EventPacker,
  GameEventIdentifiers,
  ServerEventFinder,
} from 'core/event/event';
import { Character } from 'core/characters/character';
import { GameEventStage, PlayerDiedStage } from '../stage_processor';
import { TranslationPack } from 'core/translations/translation_json_tool';
import { GameMode } from 'core/shares/types/room_props';
import { Functional } from 'core/shares/libs/functional';
import { CardId } from 'core/cards/libs/card_props';
import { VirtualCard } from 'core/cards/card';
import { PveClassicAi } from 'core/skills/game_mode/pve/pve_classic_ai';
import { MarkEnum } from 'core/shares/types/mark_list';
import { Algorithm } from 'core/shares/libs/algorithm';
import { PveClassicGuYong } from 'core/skills';

export class PveClassicGameProcessor extends StandardGameProcessor {
  private level: number = 0;
  private markList: MarkEnum[] = [];
  private human: Player[];
  private activateAi: Player[];

  public getLevelMark() {
    if (this.markList.length === 0) {
      this.markList = [
        MarkEnum.PveJi,
        MarkEnum.PveJian,
        MarkEnum.PveXi,
        MarkEnum.PveYing,
        MarkEnum.PveYu,
        MarkEnum.PveZhi,
      ];
      Algorithm.shuffle(this.markList);
    }
    return this.markList.splice(0, this.human.length * this.activateAi.length);
  }

  public assignRoles(players: Player[]) {
    const ais = players.filter(player => player.isSmartAI());
    const humans = players.filter(player => !player.isSmartAI());
    players = [...ais, ...humans];
    for (let i = 0; i < players.length; i++) {
      this.logger.debug(`player ${i} is ${players[i].Id}`);
      players[i].Role = players[i].isSmartAI() ? PlayerRole.Rebel : PlayerRole.Loyalist;
      players[i].Position = i;
    }
  }

  protected async beforeGameStartPreparation() {
    this.human = this.room.Players.filter(player => !player.isSmartAI());
    this.room.Players.filter(player => player.isSmartAI()).map(player =>
      this.room.obtainSkill(player.Id, PveClassicAi.Name),
    );
    await this.nextLevel();
  }

  protected async chooseCharacters(playersInfo: PlayerInfo[], selectableCharacters: Character[]) {
    const bossCharacter = Sanguosha.getCharacterByCharaterName('pve_soldier');
    const bossInfos = playersInfo.filter(info => this.room.getPlayerById(info.Id).isSmartAI());
    for (let i = 0; i < bossInfos.length; i++) {
      this.logger.debug(bossInfos[i]);
      const bossPropertiesChangeEvent: ServerEventFinder<GameEventIdentifiers.PlayerPropertiesChangeEvent> = {
        changedProperties: [{ toId: bossInfos[i].Id, characterId: bossCharacter.Id, playerPosition: i }],
      };
      this.room.changePlayerProperties(bossPropertiesChangeEvent);
    }

    const otherPlayersInfo = playersInfo.filter(info => !this.room.getPlayerById(info.Id).isSmartAI())!;

    await this.sequentialChooseCharacters(otherPlayersInfo, selectableCharacters, [bossCharacter]);
  }

  public getWinners(players: Player[]) {
    const alivePlayers = players.filter(player => !player.Dead);
    if (
      alivePlayers.every(player => player.isSmartAI()) ||
      (alivePlayers.every(player => !player.isSmartAI()) && this.level === 3)
    ) {
      return alivePlayers;
    }
  }

  protected async nextLevel() {
    this.level++;
    const allAI = this.room.Players.filter(player => player.isSmartAI());
    Algorithm.shuffle(allAI);
    const changedProperties: {
      toId: PlayerId;
      hp: number;
      maxHp: number;
      activate: boolean;
    }[] = [];
    allAI.splice(0, 3 - this.level);
    this.activateAi = allAI;

    this.room.Players.filter(player => player.isSmartAI()).map(player =>
      changedProperties.push(
        this.activateAi.includes(player)
          ? {
              toId: player.Id,
              activate: true,
              hp: Sanguosha.getCharacterByCharaterName('pve_soldier').Hp,
              maxHp: Sanguosha.getCharacterByCharaterName('pve_soldier').MaxHp,
            }
          : { toId: player.Id, activate: false, hp: 0, maxHp: 0 },
      ),
    );
    this.room.activate({ changedProperties });

    // level 1 draw game begins cards at game begin
    if (this.level > 1) {
      for (const player of this.activateAi) {
        this.drawGameBeginsCards(player.getPlayerInfo());
      }
    }

    let marks = this.getLevelMark();
    for (let i = 0; i < this.human.length; i++) {
      this.activateAi.map(player => {
        const mark = marks.pop()!;
        this.room.addMark(player.Id, mark, 1);
        return [];
      });
    }

    if (this.human.length === 1) {
      switch (this.level) {
        case 1:
          await this.room.obtainSkill(this.human[0].Id, PveClassicGuYong.Name);
          break;
      }
    } else {
      switch (this.level) {
        case 3:
          await this.levelRewardSkill(this.human);
          break;
      }
    }

    this.logger.debug(`room entry ${this.level} level`);
    for (const ai of this.activateAi) {
      for (const [mark, num] of Object.entries(ai.getAllMarks())) {
        this.logger.debug(`player: ${ai.Id} has marks ${mark}:${num}`);
      }
    }

    const levelBeginEvent: ServerEventFinder<GameEventIdentifiers.LevelBeginEvent> = {};
    await this.onHandleIncomingEvent(
      GameEventIdentifiers.LevelBeginEvent,
      EventPacker.createIdentifierEvent(GameEventIdentifiers.LevelBeginEvent, levelBeginEvent),
    );
  }

  private async askForChooseSkill(playerId: PlayerId, options: string[]) {
    const askForChoosingOptionsEvent: ServerEventFinder<GameEventIdentifiers.AskForChoosingOptionsEvent> = {
      options,
      toId: playerId,
      conversation: 'please announce a skill',
    };

    this.room.notify(
      GameEventIdentifiers.AskForChoosingOptionsEvent,
      EventPacker.createUncancellableEvent<GameEventIdentifiers.AskForChoosingOptionsEvent>(askForChoosingOptionsEvent),
      playerId,
    );

    const chooseResp = await this.room.onReceivingAsyncResponseFrom(
      GameEventIdentifiers.AskForChoosingOptionsEvent,
      playerId,
    );

    return chooseResp;
  }

  private async levelRewardSkill(players: Player[]) {
    const sequentialAsyncResponse: Promise<ClientEventFinder<GameEventIdentifiers.AskForChoosingCharacterEvent>>[] = [];
    const notifyOtherPlayer: PlayerId[] = players.map(player => player.Id);
    this.room.doNotify(notifyOtherPlayer);

    for (const player of players) {
      const candidateCharacters = this.room.getRandomCharactersFromLoadedPackage(5);

      this.room.notify(
        GameEventIdentifiers.AskForChoosingCharacterEvent,
        {
          amount: 1,
          characterIds: candidateCharacters,
          toId: player.Id,
          byHuaShen: true,
          translationsMessage: TranslationPack.translationJsonPatcher(
            'Please choose a character for get a skill',
          ).extract(),
          ignoreNotifiedStatus: true,
        },
        player.Id,
      );

      sequentialAsyncResponse.push(
        this.room.onReceivingAsyncResponseFrom(GameEventIdentifiers.AskForChoosingCharacterEvent, player.Id),
      );
    }

    const askForChoosingOptionsEvent: Promise<ClientEventFinder<GameEventIdentifiers.AskForChoosingOptionsEvent>>[] =
      [];
    for (const resp of await Promise.all(sequentialAsyncResponse)) {
      const options = Sanguosha.getCharacterById(resp.chosenCharacterIds[0])
        .Skills.filter(skill => !(skill.isShadowSkill() || skill.isLordSkill()))
        .map(skill => skill.GeneralName);
      askForChoosingOptionsEvent.push(this.askForChooseSkill(resp.fromId, options));
    }

    for (const resp of await Promise.all(askForChoosingOptionsEvent)) {
      await this.room.obtainSkill(resp.fromId, resp.selectedOption!);
    }
  }

  protected async onHandlePlayerDiedEvent(
    identifier: GameEventIdentifiers.PlayerDiedEvent,
    event: ServerEventFinder<GameEventIdentifiers.PlayerDiedEvent>,
    onActualExecuted?: (stage: GameEventStage) => Promise<boolean>,
  ) {
    const deadPlayer = this.room.getPlayerById(event.playerId);
    await this.iterateEachStage(identifier, event, onActualExecuted, async stage => {
      if (stage === PlayerDiedStage.PrePlayerDied) {
        this.room.broadcast(identifier, event);
        deadPlayer.bury();
        const winners = this.room.getGameWinners();
        if (winners !== undefined) {
          this.stageProcessor.clearProcess();
          this.playerStages = [];
          this.room.gameOver();
          this.room.broadcast(GameEventIdentifiers.GameOverEvent, {
            translationsMessage: TranslationPack.translationJsonPatcher(
              'game over, winner is {0}',
              Functional.getPlayerRoleRawText(winners[0].Role, GameMode.Pve),
            ).extract(),
            winnerIds: winners.map(winner => winner.Id),
            loserIds: this.room.Players.filter(player => !winners.includes(player)).map(player => player.Id),
          });
        }
      } else if (stage === PlayerDiedStage.PlayerDied) {
        const { killedBy, playerId } = event;
        await this.room.moveCards({
          moveReason: CardMoveReason.SelfDrop,
          fromId: playerId,
          movingCards: deadPlayer
            .getPlayerCards()
            .map(cardId => ({ card: cardId, fromArea: deadPlayer.cardFrom(cardId) })),
          toArea: CardMoveArea.DropStack,
        });

        const outsideCards = Object.entries(deadPlayer.getOutsideAreaCards()).reduce<CardId[]>(
          (allCards, [areaName, cards]) => {
            if (!deadPlayer.isCharacterOutsideArea(areaName)) {
              allCards.push(...cards);
            }
            return allCards;
          },
          [],
        );

        const allCards = [...deadPlayer.getCardIds(PlayerCardsArea.JudgeArea), ...outsideCards];
        await this.room.moveCards({
          moveReason: CardMoveReason.PlaceToDropStack,
          fromId: playerId,
          movingCards: allCards.map(cardId => ({ card: cardId, fromArea: deadPlayer.cardFrom(cardId) })),
          toArea: CardMoveArea.DropStack,
        });

        this.room.getPlayerById(playerId).clearMarks();
        this.room.getPlayerById(playerId).clearFlags();

        if (killedBy) {
          const killer = this.room.getPlayerById(killedBy);

          if (deadPlayer.Role === PlayerRole.Rebel && !killer.Dead) {
            await this.room.drawCards(3, killedBy, 'top', undefined, undefined, CardDrawReason.KillReward);
          } else if (deadPlayer.Role === PlayerRole.Loyalist && killer.Role === PlayerRole.Lord) {
            const lordCards = VirtualCard.getActualCards(killer.getPlayerCards());
            await this.room.moveCards({
              moveReason: CardMoveReason.SelfDrop,
              fromId: killer.Id,
              movingCards: lordCards.map(cardId => ({ card: cardId, fromArea: killer.cardFrom(cardId) })),
              toArea: CardMoveArea.DropStack,
            });
          }
        }
      } else if (stage === PlayerDiedStage.AfterPlayerDied) {
        if (this.activateAi.every(player => player.Dead) && this.level < 3) {
          this.stageProcessor.clearProcess();
          await this.nextLevel();
        }
      }
    });

    if (!this.room.isGameOver() && this.room.CurrentPhasePlayer.Id === event.playerId) {
      await this.room.skip(event.playerId);
    }
  }
}
