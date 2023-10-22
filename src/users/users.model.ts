import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';

interface UserCreationAttributes {
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'username', description: 'username' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @ApiProperty({ example: '12345678', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Refresh token', description: 'Refresh token' })
  @Column({ type: DataType.STRING, unique: true })
  refreshToken: string;
}
