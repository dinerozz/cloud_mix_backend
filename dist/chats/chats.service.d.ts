import { Chat } from "./models/chats.model";
import { UserChat } from "./models/user-chats.model";
export declare class ChatsService {
    private chatModel;
    private userChatModel;
    constructor(chatModel: typeof Chat, userChatModel: typeof UserChat);
    createChat(userIds: string[]): Promise<Chat>;
}
