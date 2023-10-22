import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class SendMessageDto {
  @ApiProperty({
    example: "Hello, how are you?",
    description: "Text of the message",
  })
  @IsString()
  text: string;

  @ApiProperty({
    example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    description: "User ID of the sender",
  })
  @IsUUID()
  userId: string;
}
