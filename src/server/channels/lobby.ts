import { Sanguosha } from 'core/game/engine';
import { TemporaryRoomCreationInfo } from 'core/game/game_props';
import { RoomId } from 'core/room/room';
import { ChatSocketEvent, LobbySocketEvent } from 'core/shares/types/server_types';
import { ServerConfig } from 'server/server_config';
import { RoomService } from 'server/services/room_service';

export class LobbyEventChannel {
  private eventHandlers: { [E in LobbySocketEvent]?: (socket: SocketIO.Socket) => (...args: any) => void } = {};

  constructor(private roomService: RoomService, private socket: SocketIO.Server, private config: ServerConfig) {
    this.socket.of('/chat').on('connect', socket => {
      socket.on(ChatSocketEvent.Chat, this.onGameChat);
    });

    this.registerEventHandler(LobbySocketEvent.GameCreated, this.onGameCreated);
    this.registerEventHandler(LobbySocketEvent.QueryRoomList, this.onQueryRoomsInfo);
    this.registerEventHandler(LobbySocketEvent.QueryVersion, this.matchCoreVersion);
    this.registerEventHandler(LobbySocketEvent.CheckRoomExist, this.onCheckingRoomExist);
  }

  start() {
    this.socket.of('/lobby').on('connect', socket => {
      this.installEventHandlers(socket);
      socket.on(LobbySocketEvent.PingServer.toString(), () => {
        socket.emit(LobbySocketEvent.PingServer.toString());
      });
    });
  }

  private readonly installEventHandlers = (socket: SocketIO.Socket) => {
    for (const [eventEnum, handler] of Object.entries<(socket: SocketIO.Socket) => (...args: any) => void>(
      this.eventHandlers,
    )) {
      socket.on(eventEnum, handler(socket));
    }
  };

  private readonly onGameChat = (message: any) => {
    this.socket.of('/chat').emit(ChatSocketEvent.Chat, message);
  };

  readonly registerEventHandler = (
    eventEnum: LobbySocketEvent,
    handler: (socket: SocketIO.Socket) => (...args: any) => void,
  ) => {
    this.eventHandlers[eventEnum] = handler;
  };

  private readonly matchCoreVersion = (socket: SocketIO.Socket) => (content: { version: string }) => {
    socket.emit(LobbySocketEvent.VersionMismatch.toString(), content.version === Sanguosha.Version);
  };

  private readonly onCheckingRoomExist = (socket: SocketIO.Socket) => (id: RoomId) => {
    socket.emit(LobbySocketEvent.CheckRoomExist.toString(), this.roomService.checkRoomExist(id));
  };

  private readonly onGameCreated = (socket: SocketIO.Socket) => (content: TemporaryRoomCreationInfo) => {
    if (content.coreVersion !== Sanguosha.Version) {
      socket.emit(LobbySocketEvent.GameCreated.toString(), {
        error: 'unmatched core version',
      });
      return;
    }

    const { roomId } = this.roomService.createWaitingRoom(content);
    socket.emit(LobbySocketEvent.GameCreated.toString(), {
      roomId,
      roomInfo: content,
    });
  };

  private readonly onQueryRoomsInfo = (socket: SocketIO.Socket) => () => {
    socket.emit(LobbySocketEvent.QueryRoomList.toString(), this.roomService.getRoomsInfo());
  };

  readonly join = (channelId: string) => {
    return this.socket.of(channelId);
  };
}