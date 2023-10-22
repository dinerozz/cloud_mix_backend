import { Module } from "@nestjs/common";
import { ChatsService } from "./chats.service";
import { ChatsController } from "./chats.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Chat } from "./models/chats.model";
import { MessagesService } from "../messages/messages.service";
import { ChatsGateway } from "./chats.gateway";
import { UserChat } from "./models/user-chats.model";
import { MessagesModule } from "../messages/messages.module";
import { Message } from "../messages/messages.model";

@Module({
  imports: [
    MessagesModule,
    SequelizeModule.forFeature([Message, Chat, UserChat]),
  ],
  providers: [ChatsService, ChatsGateway, MessagesService],
  controllers: [ChatsController],
  exports: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
