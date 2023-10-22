import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Chat } from "./models/chats.model";
import { UserChat } from "./models/user-chats.model";

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,
    @InjectModel(UserChat)
    private userChatModel: typeof UserChat
  ) {}

  async createChat(userIds: string[]): Promise<Chat> {
    const chat = new this.chatModel();
    await chat.save();

    const userChats = userIds.map((userId) => ({
      userId,
      chatId: chat.id,
      uniqueIndex: `${userId}-${chat.id}`,
    }));

    await this.userChatModel.bulkCreate(userChats);

    return chat;
  }
}
