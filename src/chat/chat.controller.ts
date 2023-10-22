import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "../users/users.service";
import { ChatService, UserChat } from "./chat.service";
import { SendMessageDto } from "./dto/send-message.dto";
import { CreateChatDto } from "./dto/create-chat.dto";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/initialize")
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(
      createChatDto.userId1,
      createChatDto.userId2
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async getUserChats(@Req() req): Promise<UserChat[]> {
    return await this.chatService.getUserChats(req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get("/chat/:id")
  async getChat(@Param("id") chatId: string) {
    return this.chatService.getChatById(chatId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/chat/:id/message")
  async sendMessage(
    @Param("id") chatId: string,
    @Body() sendMessageDto: SendMessageDto
  ) {
    return this.chatService.sendMessage(
      chatId,
      sendMessageDto.userId,
      sendMessageDto.text
    );
  }
}
