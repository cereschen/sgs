import { Sanguosha } from 'core/game/engine';
import { GameProcessor } from 'core/game/game_processor/game_processor';
import { OneVersusTwoGameProcessor } from 'core/game/game_processor/game_processor.1v2';
import { TwoVersusTwoGameProcessor } from 'core/game/game_processor/game_processor.2v2';
import { PveGameProcessor } from 'core/game/game_processor/game_processor.pve';
import { PveClassicGameProcessor } from 'core/game/game_processor/game_processor.pve_classic';
import { StandardGameProcessor } from 'core/game/game_processor/game_processor.standard';
import { GameInfo } from 'core/game/game_props';
import { GameCommonRules } from 'core/game/game_rules';
import { RecordAnalytics } from 'core/game/record_analytics';
import { StageProcessor } from 'core/game/stage_processor';
import { ServerSocket } from 'core/network/socket.server';
import { RoomId } from 'core/room/room';
import { ServerRoom } from 'core/room/room.server';
import { RoomEventStacker } from 'core/room/utils/room_event_stack';
import { Logger } from 'core/shares/libs/logger/logger';
import { Flavor } from 'core/shares/types/host_config';
import { GameMode } from 'core/shares/types/room_props';
import { ChatSocketEvent, LobbySocketEvent } from 'core/shares/types/server_types';
import { Languages } from 'core/translations/translation_json_tool';
import { TranslationModule } from 'core/translations/translation_module';
import * as http from 'http';
import * as https from 'https';
import * as SocketIO from 'socket.io';
import { SimplifiedChinese } from './languages';
import { getServerConfig, ServerConfig } from './server_config';

class App {
  private server: http.Server | https.Server;
  private rooms: ServerRoom[] = [];
  private roomsPathList: string[] = [];
  private config: ServerConfig;
  private translator: TranslationModule;
  private lobbySocket: SocketIO.Server;
  constructor(mode: Flavor, private logger: Logger) {
    this.config = getServerConfig(mode);
    this.server = http.createServer();
    this.lobbySocket = SocketIO.listen(this.server, {
      origins: '*:*',
    });
    this.server.listen(this.config.port);
  }

  private async log() {
    this.logger.info('-----', 'Sanguosha Server Launched', '-----');
    this.logger.info('-----', 'Server listening at port ', `${this.config.port}`, '-----');
    this.logger.info('-----', 'Core Version', Sanguosha.Version, '-----');
  }

  private loadLanguages(language: Languages) {
    this.translator = TranslationModule.setup(language, [Languages.ZH_CN, SimplifiedChinese]);

    this.logger.Translator = this.translator;
  }

  public start() {
    this.loadLanguages(this.config.language);

    Sanguosha.initialize();
    this.log();

    this.lobbySocket.of('/lobby').on('connect', socket => {
      socket
        .on(LobbySocketEvent.GameCreated.toString(), this.onGameCreated(socket))
        .on(LobbySocketEvent.QueryRoomList.toString(), this.onQueryRoomsInfo(socket))
        .on(LobbySocketEvent.QueryVersion.toString(), this.matchCoreVersion(socket))
        .on(LobbySocketEvent.CheckRoomExist.toString(), this.onCheckingRoomExist(socket))
        .on(LobbySocketEvent.PingServer.toString(), this.onPing(socket));
    });
    this.lobbySocket.of('/chat').on('connect', socket => {
      socket.on(ChatSocketEvent.Chat, this.onGameChat);
    });
  }

  private readonly onGameChat = (message: any) => {
    this.lobbySocket.of('/chat').emit(ChatSocketEvent.Chat, message);
  };

  private readonly matchCoreVersion = (socket: SocketIO.Socket) => (content: { version: string }) => {
    socket.emit(LobbySocketEvent.VersionMismatch.toString(), content.version === Sanguosha.Version);
  };

  private readonly onCheckingRoomExist = (socket: SocketIO.Socket) => (id: RoomId) => {
    socket.emit(LobbySocketEvent.CheckRoomExist.toString(), this.rooms.find(room => room.RoomId) !== undefined);
  };

  private readonly onPing = (socket: SocketIO.Socket) => () => {
    socket.emit(LobbySocketEvent.PingServer.toString());
  };

  private readonly createDifferentModeGameProcessor = (content: GameInfo): GameProcessor => {
    this.logger.debug('game mode is ' + content.gameMode);
    switch (content.gameMode) {
      case GameMode.Pve:
        if (content.numberOfPlayers <= 3) {
          return new PveGameProcessor(new StageProcessor(this.logger), this.logger);
        } else if (content.numberOfPlayers <= 5) {
          return new PveClassicGameProcessor(new StageProcessor(this.logger), this.logger);
        } else {
          throw new Error('Pve Player Number Abnormal ');
        }
      case GameMode.OneVersusTwo:
        return new OneVersusTwoGameProcessor(new StageProcessor(this.logger), this.logger);
      case GameMode.TwoVersusTwo:
        return new TwoVersusTwoGameProcessor(new StageProcessor(this.logger), this.logger);
      case GameMode.Standard:
      default:
        return new StandardGameProcessor(new StageProcessor(this.logger), this.logger);
    }
  };

  private readonly onGameCreated = (socket: SocketIO.Socket) => (content: GameInfo) => {
    if (content.coreVersion !== Sanguosha.Version) {
      socket.emit(LobbySocketEvent.GameCreated.toString(), {
        error: 'unmatched core version',
      });
      return;
    }

    const roomId = Date.now();
    const roomSocket = new ServerSocket(this.lobbySocket.of(`/room-${roomId}`), roomId, this.logger);
    const room = new ServerRoom(
      roomId,
      content,
      roomSocket,
      this.createDifferentModeGameProcessor(content),
      new RecordAnalytics(),
      [],
      this.config.mode,
      this.logger,
      content.gameMode,
      new GameCommonRules(),
      new RoomEventStacker(),
    );

    room.onClosed(() => {
      this.rooms = this.rooms.filter(r => r !== room);
    });

    this.rooms.push(room);
    this.roomsPathList.push(roomSocket.RoomId);
    socket.emit(LobbySocketEvent.GameCreated.toString(), {
      roomId,
      roomInfo: content,
    });
  };

  private readonly onQueryRoomsInfo = (socket: SocketIO.Socket) => () => {
    const roomsInfo = this.rooms.map(room => room.getRoomInfo());
    socket.emit(LobbySocketEvent.QueryRoomList.toString(), roomsInfo);
  };
}

const mode = (process.env.REACT_APP_DEV_MODE as Flavor) || Flavor.Dev;

new App(mode, new Logger(mode)).start();
