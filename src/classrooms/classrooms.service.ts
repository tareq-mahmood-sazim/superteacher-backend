import { Injectable } from "@nestjs/common";

import { ClassroomRepository } from "./classrooms.repository";
import { CreateClassroomDto } from "./dto/create-classroom.dto";
import { UpdateClassroomDto } from "./dto/update-classroom.dto";

@Injectable()
export class ClassroomsService {
  constructor(private readonly classroomRepository: ClassroomRepository) {}
  create(createClassroomDto: CreateClassroomDto, teacherId: number) {
    return this.classroomRepository.createClassroom(createClassroomDto, teacherId);
  }
  
  findAllById(id: number) {
    return this.classroomRepository.getClassroomByTeacherId(id);
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
    return `This action removes a #${id} classroom`;
  }
}
