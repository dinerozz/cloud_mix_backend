import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { Chat } from "../chats/models/chats.model";

@Table({ tableName: "messages" })
export class Message extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.UUID, allowNull: false })
  chatId: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Chat)
  chat: Chat;
}
