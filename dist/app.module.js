"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const users_model_1 = require("./users/users.model");
const auth_module_1 = require("./auth/auth.module");
const chat_bot_module_1 = require("./chat-bot/chat-bot.module");
const messages_module_1 = require("./messages/messages.module");
const chats_module_1 = require("./chats/chats.module");
const user_chats_model_1 = require("./chats/models/user-chats.model");
const chats_model_1 = require("./chats/models/chats.model");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [users_model_1.User, chats_model_1.Chat, user_chats_model_1.UserChat],
                autoLoadModels: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            chat_bot_module_1.ChatBotModule,
            messages_module_1.MessagesModule,
            chats_module_1.ChatsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map