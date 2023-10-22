import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Message } from "./messages.model";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message)
    private messageModel: typeof Message
  ) {}

  async createMessage(
    content: string,
    userId: string,
    chatId: string
  ): Promise<Message> {
    const message = new this.messageModel({ content, userId, chatId });
    await message.save();
    return message;
  }

  async getMessagesForChat(chatId: string): Promise<Message[]> {
    return this.messageModel.findAll({ where: { chatId } });
  }
}
