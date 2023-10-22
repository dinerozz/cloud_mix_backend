import { Model } from "sequelize-typescript";
import { User } from "../users/users.model";
import { Chat } from "../chats/models/chats.model";
export declare class Message extends Model {
    id: string;
    userId: string;
    chatId: string;
    content: string;
    user: User;
    chat: Chat;
}
