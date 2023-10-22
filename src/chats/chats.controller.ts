import { Body, Controller, Post } from "@nestjs/common";
import { ChatsService } from "./chats.service";

@Controller("chats")
export class ChatsController {
  constructor(private chatService: ChatsService) {}

  @Post()
  async createChat(@Body() userIds: string[]) {
    return this.chatService.createChat(userIds);
  }
}
