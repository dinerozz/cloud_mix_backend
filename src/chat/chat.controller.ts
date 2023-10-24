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
import { ChatService, UserChat } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { Request } from "express";

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

  @Get(":chatId/participant")
  async getChatParticipant(
    @Param("chatId") chatId: string,
    @Req() req: Request
  ): Promise<{ id: string; username: string }> {
    return this.chatService.getChatParticipant(chatId, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/chat/:id")
  async getChat(@Param("id") chatId: string) {
    return this.chatService.getChatById(chatId);
  }

  @Get(":chatId/history")
  async getChatHistory(@Param("chatId") chatId: string) {
    const history = await this.chatService.getChatHistory(chatId);
    return history;
  }
}
