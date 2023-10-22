import { Message } from "./messages.model";
export declare class MessagesService {
    private messageModel;
    constructor(messageModel: typeof Message);
    createMessage(content: string, userId: string, chatId: string): Promise<Message>;
    getMessagesForChat(chatId: string): Promise<Message[]>;
}
