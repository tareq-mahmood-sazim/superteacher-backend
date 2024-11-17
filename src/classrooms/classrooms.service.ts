import { Injectable } from "@nestjs/common";

import { ClassroomRepository } from "./classrooms.repository";
import { AddMeetLinkDto } from "./dto/add-meetLink.dto";
import { AddParticipantDto } from "./dto/add-participant.dto";
import { CreateClassroomDto } from "./dto/create-classroom.dto";
import { RemoveParticipantDto } from "./dto/remove-participant.dto";
import { UpdateClassroomDto } from "./dto/update-classroom.dto";

@Injectable()
export class ClassroomsService {
  constructor(private readonly classroomRepository: ClassroomRepository) {}

  create(createClassroomDto: CreateClassroomDto, teacherId: number) {
    return this.classroomRepository.createClassroom(createClassroomDto, teacherId);
  }
  addStudentToClassroom(addParticipantDto: AddParticipantDto, teacherId: number) {
    return this.classroomRepository.addStudentInClassroom(
      addParticipantDto.studentIds,
      addParticipantDto.classroomId,
      teacherId,
    );
  }
  removeStudentFromClassroom(removeParticipantDto: RemoveParticipantDto, teacherId: number) {
    return this.classroomRepository.removeStudentFromClassroom(
      removeParticipantDto.studentId,
      removeParticipantDto.classroomId,
      teacherId,
    );
  }

  findAllById(id: number) {
    return this.classroomRepository.getClassroomByTeacherId(id);
  }

  findAllParticipantsByTeacherId(id: number, classroomId: number) {
    return this.classroomRepository.getClassroomParticipantsByTeacherId(id, classroomId);
  }

  addMeetLink(addMeetLinkDto: AddMeetLinkDto) {
    return this.classroomRepository.addMeetLink(addMeetLinkDto);
  }

  findAll() {
    return `This action returns all classrooms`;
  }

  findOne(id: number) {
    return this.classroomRepository.getClassroomById(id);
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom ${updateClassroomDto}`;
  }

  remove(id: number) {
    return this.classroomRepository.deleteClassroom(id);
  }

  async isParticipant(studentId: number, classroomId: number) {
    const data = await this.classroomRepository.isParticipant(studentId, classroomId);
    return { statusCode: 200, message: "success", data };
  }
}
