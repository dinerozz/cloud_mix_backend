import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Message } from "./messages.model";

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
