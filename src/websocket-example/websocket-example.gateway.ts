import { UnauthorizedException } from "@nestjs/common"; // Import Logger
import { JwtService } from "@nestjs/jwt";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

import { getCorsConfig } from "@/common/config/cors.config";
import extractBearerAuthTokenFromHeaders from "@/common/middleware/bearer-token-validator.middleware";
import { AbstractWebsocketGateway } from "@/common/websockets/abstract-websocket.gateway";
import { TSocket } from "@/common/websockets/abstract-websocket.types";

import { CreateMessageDto } from "./dto/create-message.dto";
import { EGatewayIncomingEvent, EGatewayOutgoingEvent } from "./websocket-example.enum";
import { MessagesRepository } from "./websocket-example.repository";

@WebSocketGateway(Number(process.env.BE_WS_PORT), {
  cors: getCorsConfig(),
  path: "/",
  transports: ["websocket"],
})
export class WebsocketExampleGateway extends AbstractWebsocketGateway {
  constructor(
    private readonly jwtService: JwtService,
    private readonly messagesRepository: MessagesRepository,
  ) {
    super();
  }

  private userIdToSocketMap: Map<number, TSocket> = new Map();

  onModuleInit(): void {
    super.onModuleInit();

    this.server.use((socket: TSocket, next) => {
      const headers = socket.handshake.auth;
      const token = extractBearerAuthTokenFromHeaders(headers);

      try {
        const payload = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
          ignoreExpiration: false,
          ignoreNotBefore: false,
        });
        socket.userId = payload.sub;
        return next();
      } catch (err) {
        return next(new UnauthorizedException());
      }
    });
  }

  processNewConnection(socket: TSocket): void {
    const userId = socket.userId;

    if (userId) {
      this.userIdToSocketMap.set(userId, socket);
    }
  }

  emitPayloadToRoom<TPayload>(room: string, event: string, payload: TPayload): void {
    this.server.to(room).emit(event, payload);
  }

  emitPayloadForEvent<TPayload>(event: string, payload: TPayload): void {
    this.server.emit(event, payload);
  }

  @SubscribeMessage(EGatewayIncomingEvent.PING)
  handlePing(@MessageBody() payload: CreateMessageDto, @ConnectedSocket() socket: TSocket): void {
    const parsedPayload = { ...payload, sender: socket.userId as number };
    this.messagesRepository.createMessage(parsedPayload);
    this.emitPayloadForEvent(EGatewayOutgoingEvent.PONG, parsedPayload);
  }
}
