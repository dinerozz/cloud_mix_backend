import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chat } from "./models/chat.model";
import { Message } from "./models/message.model";
import { User } from "../users/users.model";
import { Op } from "sequelize";

export interface UserChat {
  id: string;
  userId1: string;
  userId2: string;
  updatedAt: Date;
  createdAt: Date;
  otherUserName: string;
}

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,
    @InjectModel(Message)
    private messageModel: typeof Message,
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async createChat(userId1: string, userId2: string): Promise<Chat> {
    return this.chatModel.create({ userId1, userId2 });
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

  async getMessages(chatId: string): Promise<Message[]> {
    return this.messageModel.findAll({ where: { chatId } });
  }

  async sendMessage(data: {
    chatId: string;
    userId: string;
    text: string;
  }): Promise<Message> {
    return this.messageModel.create(data);
  }
}
