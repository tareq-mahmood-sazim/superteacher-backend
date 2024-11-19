import { Module } from "@nestjs/common";

import { MessagesRepository } from "@/websocket-example/websocket-example.repository";

import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
