import { ChatsService } from "./chats.service";
export declare class ChatsController {
    private chatService;
    constructor(chatService: ChatsService);
    createChat(userIds: string[]): Promise<import("./models/chats.model").Chat>;
}
