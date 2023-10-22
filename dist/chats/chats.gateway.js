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
exports.ChatsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("../messages/messages.service");
let ChatsGateway = class ChatsGateway {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    afterInit(server) {
        console.log("Initialized!");
    }
    handleConnection(client, ...args) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleMessage(client, payload) {
        const message = await this.messagesService.createMessage(payload.content, payload.userId, payload.chatId);
        this.server.to(payload.chatId).emit("message", message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleMessage", null);
ChatsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], ChatsGateway);
exports.ChatsGateway = ChatsGateway;
//# sourceMappingURL=chats.gateway.js.map