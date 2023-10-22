import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import { ChatBotModule } from "./chat-bot/chat-bot.module";
import { MessagesModule } from "./messages/messages.module";
import { ChatsModule } from "./chats/chats.module";
import { UserChat } from "./chats/models/user-chats.model";
import { Chat } from "./chats/models/chats.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Chat, UserChat],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    ChatBotModule,
    MessagesModule,
    ChatsModule,
  ],
})
export class AppModule {}
