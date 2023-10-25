import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage("joinChat")
  async handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string }
  ) {
    client.join(data.chatId);
    console.log(`Client ${client.id} joined chat ${data.chatId}`);
  }

  @SubscribeMessage("getChatHistory")
  async handleGetChatHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string }
  ) {
    await this.chatService.markMessagesAsRead(data.chatId, data.userId);

    const chatHistory = await this.chatService.getChatHistory(data.chatId);
    client.emit("chatHistory", chatHistory);
  }

  @SubscribeMessage("markAsRead")
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string }
  ) {
    await this.chatService.markMessagesAsRead(data.chatId, data.userId);
    const unreadCount = await this.chatService.getUnreadMessagesCount(
      data.chatId,
      data.userId
    );
    client.emit("unreadCount", { chatId: data.chatId, unreadCount });
  }

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string; text: string }
  ) {
    const message = await this.chatService.sendMessage(data);
    this.server.to(data.chatId).emit("newMessage", message);

    const otherUserId = await this.chatService.getOtherUserId(
      data.chatId,
      data.userId
    );

    const dialogListUser1 = await this.chatService.getUserChats(data.userId);
    const dialogListUser2 = await this.chatService.getUserChats(otherUserId);

    this.server.to(data.chatId).emit("updateDialogList", dialogListUser1);
    this.server.to(data.chatId).emit("updateDialogList", dialogListUser2);

    await this.chatService.markMessagesAsRead(data.chatId, data.userId);
  }
}
