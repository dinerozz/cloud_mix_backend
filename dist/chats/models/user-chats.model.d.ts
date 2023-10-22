import { Model } from "sequelize-typescript";
export declare class UserChat extends Model {
    id: number;
    userId: string;
    chatId: string;
    uniqueIndex: string;
}
