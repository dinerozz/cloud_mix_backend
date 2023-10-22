import { Column, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";

@Table({ tableName: "chats" })
export class Chat extends Model {
  @ApiProperty({ example: "1", description: "Unique identificator" })
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;
}
