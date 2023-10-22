import { Model } from "sequelize-typescript";
export declare class BotChat extends Model {
    id: number;
    botId: string;
    chatId: string;
    uniqueIndex: string;
}
