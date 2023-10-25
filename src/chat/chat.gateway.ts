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
  private userSocketMap = new Map<string, string>();

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage("joinChat")
  async handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string }
  ) {
    this.userSocketMap.set(data.userId, client.id);
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
    console.log(data.userId, "userID");
    const socketIdUser1 = this.userSocketMap.get(data.userId);
    const socketIdUser2 = this.userSocketMap.get(otherUserId);
    console.log(data.userId, otherUserId, "ids");

    console.log("Socket ID for user1:", socketIdUser1);
    console.log("Socket ID for user2:", socketIdUser2);

    if (socketIdUser1) {
      this.server.to(socketIdUser1).emit("updateDialogList", dialogListUser1);
    }

    if (socketIdUser2) {
      this.server.to(socketIdUser2).emit("updateDialogList", dialogListUser2);
    }

    await this.chatService.markMessagesAsRead(data.chatId, data.userId);
  }
}
