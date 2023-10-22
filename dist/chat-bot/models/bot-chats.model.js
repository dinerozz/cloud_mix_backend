"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotChat = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const chat_bot_model_1 = require("./chat-bot.model");
const chats_model_1 = require("../../chats/models/chats.model");
let BotChat = class BotChat extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], BotChat.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chat_bot_model_1.Bot),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], BotChat.prototype, "botId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chats_model_1.Chat),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], BotChat.prototype, "chatId", void 0);
__decorate([
    (0, sequelize_typescript_1.Unique)("BotChatUnique"),
    sequelize_typescript_1.Index,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], BotChat.prototype, "uniqueIndex", void 0);
BotChat = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "bot_chats" })
], BotChat);
exports.BotChat = BotChat;
//# sourceMappingURL=bot-chats.model.js.map