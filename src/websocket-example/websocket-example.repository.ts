import { ForbiddenException, Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/postgresql";

import { Classroom } from "@/common/entities/classroom.entity";
import { Message } from "@/common/entities/message.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";

import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class ClassroomRepository {
  constructor(private readonly em: EntityManager) {}
  async createMessage(createMessageDto: CreateMessageDto) {
    const message = new Message();
    const senderId = await this.em.findOne(UserProfile, createMessageDto.sender);
    const classroomId = await this.em.findOne(Classroom, createMessageDto.classroom);
    if (senderId || classroomId) return new ForbiddenException();
    if (senderId && classroomId) {
      message.content = createMessageDto.content;
      message.sender = senderId;
      message.classroom = classroomId;
      message.senderType = createMessageDto.senderType;
      await this.em.persistAndFlush(message);
      return message;
    } else {
      throw new ForbiddenException();
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
