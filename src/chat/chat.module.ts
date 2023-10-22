import { forwardRef, Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Chat } from "./models/chat.model";
import { Message } from "./models/message.model";
import { ChatGateway } from "./chat.gateway";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthModule } from "../auth/auth.module";
import { User } from "../users/users.model";
import { UsersModule } from "../users/users.module";

@Module({
  providers: [ChatService, ChatGateway, JwtAuthGuard],
  imports: [
    UsersModule,
    AuthModule,
    SequelizeModule.forFeature([Chat, Message, User]),
  ],
  controllers: [ChatController],
})
export class ChatModule {}
