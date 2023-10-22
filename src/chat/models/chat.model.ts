import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "../../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

interface ChatCreationAttributes {
  userId1: string;
  userId2: string;
}

@Table({ tableName: "chats" })
export class Chat extends Model<Chat, ChatCreationAttributes> {
  @ApiProperty({
    example: "2e4e7e35-62e8-4dd4-8420-1b8e21311bb5",
    description: "Unique identificator",
  })
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  userId1: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  userId2: string;

  @BelongsTo(() => User, "userId1")
  user1: User;

  @BelongsTo(() => User, "userId2")
  user2: User;
}
