"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const common_1 = require("@nestjs/common");
const chats_service_1 = require("./chats.service");
const chats_controller_1 = require("./chats.controller");
const sequelize_1 = require("@nestjs/sequelize");
const chats_model_1 = require("./models/chats.model");
const messages_service_1 = require("../messages/messages.service");
const chats_gateway_1 = require("./chats.gateway");
const user_chats_model_1 = require("./models/user-chats.model");
const messages_module_1 = require("../messages/messages.module");
const messages_model_1 = require("../messages/messages.model");
let ChatsModule = class ChatsModule {
};
ChatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            messages_module_1.MessagesModule,
            sequelize_1.SequelizeModule.forFeature([messages_model_1.Message, chats_model_1.Chat, user_chats_model_1.UserChat]),
        ],
        providers: [chats_service_1.ChatsService, chats_gateway_1.ChatsGateway, messages_service_1.MessagesService],
        controllers: [chats_controller_1.ChatsController],
        exports: [chats_service_1.ChatsService, chats_gateway_1.ChatsGateway],
    })
], ChatsModule);
exports.ChatsModule = ChatsModule;
//# sourceMappingURL=chats.module.js.map