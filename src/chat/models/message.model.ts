import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/users.model";
import { DataTypes } from "sequelize";
import { Chat } from "./chat.model";
import { ApiProperty } from "@nestjs/swagger";

interface MessageCreationAttributes {
  text: string;
  userId: string;
  chatId: string;
}

@Table({ tableName: "messages" })
export class Message extends Model<Message, MessageCreationAttributes> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Chat)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  chatId: string;
}
