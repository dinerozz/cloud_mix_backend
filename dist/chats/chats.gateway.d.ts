import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "../messages/messages.service";
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, payload: {
        content: string;
        userId: string;
        chatId: string;
    }): Promise<void>;
}
