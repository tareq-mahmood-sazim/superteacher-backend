import { ForbiddenException, Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/postgresql";

import { Classroom } from "@/common/entities/classroom.entity";
import { Message } from "@/common/entities/message.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";

import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesRepository {
  constructor(private readonly em: EntityManager) {}
  async createMessage(createMessageDto: CreateMessageDto) {
    const em = this.em.fork();
    const message = new Message();

    const senderId = await em.findOne(UserProfile, { id: createMessageDto.sender });
    const classroomId = await em.findOne(Classroom, { id: createMessageDto.classroomId });

    if (!senderId || !classroomId) {
      throw new ForbiddenException("Sender or classroom not found.");
    }
    if (senderId && classroomId) {
      message.content = createMessageDto.content;
      message.sender = senderId;
      message.classroom = classroomId;
      message.senderType = createMessageDto.senderType;
      await em.persistAndFlush(message);
      return message;
    } else {
      throw new ForbiddenException("Unable to save.");
    }
  }
  async getMessage(id: number) {
    const message = await this.em.findOne(Message, id);
    return message;
  }
  async getMessageByClassroom(id: number) {
    const messages = await this.em.find(Message, { classroom: id });
    return messages;
  }
}
