import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {DataTypes} from "sequelize";

@Table({ tableName: 'bots' })
export class Bot extends Model {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'BotName', description: 'Name of the bot' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

}
