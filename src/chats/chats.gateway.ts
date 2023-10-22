import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "../messages/messages.service";
import { InjectModel } from "@nestjs/sequelize";

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private messagesService: MessagesService) {}

  afterInit(server: Server) {
    console.log("Initialized!");
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("message")
  async handleMessage(
    client: Socket,
    payload: { content: string; userId: string; chatId: string }
  ) {
    const message = await this.messagesService.createMessage(
      payload.content,
      payload.userId,
      payload.chatId
    );
    this.server.to(payload.chatId).emit("message", message);
  }
}
