import { Injectable } from "@nestjs/common";

import { MessagesRepository } from "@/websocket-example/websocket-example.repository";

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    const messages = this.messagesRepository.getMessageByClassroom(id);
    return messages;
  }

  update(id: number) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
