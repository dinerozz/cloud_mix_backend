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
exports.Message = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../users/users.model");
const chats_model_1 = require("../chats/models/chats.model");
let Message = class Message extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Message.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chats_model_1.Chat),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Message.prototype, "chatId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Message.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => chats_model_1.Chat),
    __metadata("design:type", chats_model_1.Chat)
], Message.prototype, "chat", void 0);
Message = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "messages" })
], Message);
exports.Message = Message;
//# sourceMappingURL=messages.model.js.map