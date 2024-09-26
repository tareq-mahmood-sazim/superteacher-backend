import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import { Degree } from "@/common/entities/main.enum";
import { Teacher } from "@/common/entities/teacher.entity";

import { CreateTeacherListDto } from "./dto/create-teacher-list.dto";
import { UpdateTeacherListDto } from "./dto/update-teacher-list.dto";

@Injectable()
export class TeacherListRepository {
  constructor(private readonly em: EntityManager) {}

  create(createTeacherListDto: CreateTeacherListDto) {
    const { highestEducationLevel, ...filteredDto } = createTeacherListDto;
    const teacher = new Teacher();
    teacher.highestEducationLevel = Degree[highestEducationLevel as keyof typeof Degree];
    Object.assign(teacher, filteredDto);
    return this.em.persistAndFlush(teacher);
  }
  update(id: string, updateTeacherListDto: UpdateTeacherListDto) {
    const teacher = this.findOne(id);
    if (!teacher) {
      return null;
    }
    Object.assign(teacher, updateTeacherListDto);
    return this.em.persistAndFlush(teacher);
  }
  findOne(id: string) {
    return this.em.findOne(Teacher, id);
  }
  findAll() {
    return null;
  }
}
