import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'Username' })
  @IsString({ message: 'Should be a string' })
  readonly username: string;
  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString({ message: 'Should be a string' })
  @Length(8, 24, { message: 'Not less than 8 and not more than 24' })
  readonly password: string;
}
