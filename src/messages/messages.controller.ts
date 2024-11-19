import { Controller, Get, Patch, Param, Delete } from "@nestjs/common";

import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.messagesService.update(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.messagesService.remove(+id);
  }
}
