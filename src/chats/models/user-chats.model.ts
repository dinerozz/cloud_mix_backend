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
import { User } from "../../users/users.model";
import { Chat } from "./chats.model";

@Table({ tableName: "user_chats" })
export class UserChat extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.UUID, allowNull: false })
  chatId: string;

  @Unique("UserChatUnique")
  @Index
  @Column(DataType.UUID)
  uniqueIndex: string;
}
