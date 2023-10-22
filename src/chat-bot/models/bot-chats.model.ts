import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Index,
} from "sequelize-typescript";
import { Bot } from "./chat-bot.model";
import { Chat } from "../../chats/models/chats.model";

@Table({ tableName: "bot_chats" })
export class BotChat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Bot)
  @Column({ type: DataType.UUID, allowNull: false })
  botId: string;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.UUID, allowNull: false })
  chatId: string;

  @Unique("BotChatUnique")
  @Index
  @Column(DataType.UUID)
  uniqueIndex: string;
}
