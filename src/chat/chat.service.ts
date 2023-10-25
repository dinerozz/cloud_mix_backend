import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chat } from "./models/chat.model";
import { Message } from "./models/message.model";
import { User } from "../users/users.model";
import { Op } from "sequelize";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

export interface UserChat {
  id: string;
  userId1: string;
  userId2: string;
  updatedAt: Date;
  createdAt: Date;
  otherUserName: string;
  lastMessage: string;
  unreadCount: number;
}

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,
    @InjectModel(Message)
    private messageModel: typeof Message,
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  async createChat(userId1: string, userId2: string): Promise<Chat> {
    const existingChat = await this.chatModel.findOne({
      where: {
        [Op.or]: [
          { userId1: userId1, userId2: userId2 },
          { userId1: userId2, userId2: userId1 },
        ],
      },
    });

    if (existingChat) {
      throw new ConflictException("Chat already exists between these users");
    }

    return this.chatModel.create({ userId1, userId2 });
  }

  async getChatParticipant(
    chatId: string,
    req: Request
  ): Promise<{ id: string; username: string }> {
    const token = req.cookies["jwt"];
    const user = this.jwtService.decode(token);

    const chat = await this.chatModel.findOne({
      where: { id: chatId },
      include: [
        {
          model: User,
          as: "user1",
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "user2",
          attributes: ["id", "username"],
        },
      ],
    });

    if (!chat) {
      throw new NotFoundException("Chat not found");
    }

    const otherUser = chat.userId1 !== user["id"] ? chat.user1 : chat.user2;

    return { id: otherUser.id, username: otherUser.username };
  }

  async getUserChats(userId: string): Promise<UserChat[]> {
    const chats = await this.chatModel.findAll({
      where: {
        [Op.or]: [{ userId1: userId }, { userId2: userId }],
      },
      include: [
        {
          model: User,
          as: "user1",
          attributes: ["username"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          attributes: ["username"],
          required: false,
        },
        {
          model: Message,
          attributes: ["text", "createdAt", "checked"],
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
      ],
    });

    return chats.map((chat) => ({
      id: chat.id,
      userId1: chat.userId1,
      userId2: chat.userId2,
      updatedAt: chat.updatedAt,
      createdAt: chat.createdAt,
      otherUserName:
        chat.userId1 !== userId ? chat.user1.username : chat.user2.username,
      lastMessage: chat.messages[0]?.text,
      unreadCount: chat.messages.filter((message) => !message.checked).length,
    }));
  }

  async getChatById(chatId: string): Promise<Chat> {
    return this.chatModel.findByPk(chatId);
  }

  async getChatHistory(chatId: string): Promise<Message[]> {
    return this.messageModel.findAll({
      where: { chatId },
      order: [["createdAt", "ASC"]], // Это упорядочит сообщения по времени создания в возрастающем порядке
    });
  }

  async markMessagesAsRead(chatId: string, userId: string): Promise<void> {
    await this.messageModel.update(
      { checked: true },
      { where: { chatId, checked: false } }
    );
  }

  async getUnreadMessagesCount(
    chatId: string,
    userId: string
  ): Promise<number> {
    const count = await this.messageModel.count({
      where: { chatId, userId: { [Op.ne]: userId }, checked: false },
    });
    return count;
  }

  async sendMessage(data: {
    chatId: string;
    userId: string;
    text: string;
  }): Promise<Message> {
    return this.messageModel.create(data);
  }

  async getOtherUserId(chatId: string, userId: string): Promise<string> {
    const chat = await this.chatModel.findOne({
      where: { id: chatId },
      include: [
        {
          model: User,
          as: "user1",
          attributes: ["id"],
        },
        {
          model: User,
          as: "user2",
          attributes: ["id"],
        },
      ],
    });

    if (!chat) {
      throw new NotFoundException("Chat not found");
    }

    return chat.userId1 !== userId ? chat.userId1 : chat.userId2;
  }
}
