import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private messageService;
    constructor(messageService: MessagesService);
    createMessage(content: string, userId: string, chatId: string): Promise<import("./messages.model").Message>;
}
