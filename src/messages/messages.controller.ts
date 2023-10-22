import { Body, Controller, Post } from "@nestjs/common";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post()
  async createMessage(
    @Body("content") content: string,
    @Body("userId") userId: string,
    @Body("chatId") chatId: string
  ) {
    return this.messageService.createMessage(content, userId, chatId);
  }
}
