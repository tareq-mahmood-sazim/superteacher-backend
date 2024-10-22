import { ForbiddenException, Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/postgresql";

import dayjs from "dayjs";

import { Classroom } from "@/common/entities/classroom.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { EUserRole } from "@/common/enums/roles.enums";

import { CreateClassroomDto } from "./dto/create-classroom.dto";

@Injectable()
export class ClassroomRepository {
  constructor(private readonly em: EntityManager) {}

  async createClassroom(
    createClassroomDto: CreateClassroomDto,
    teacherId: number,
  ): Promise<Classroom> {
    const teacher = await this.em.findOne(UserProfile, teacherId);
    const { title, subject, classTime, daysOfTheWeek } = createClassroomDto;
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    if (teacher.role.name !== EUserRole.TEACHER) {
      throw new ForbiddenException("Only teachers can create classrooms");
    }

    const [hours, minutes] = classTime.split(":");
    const timeAsDate = dayjs()
      .set("hour", Number(hours))
      .set("minute", Number(minutes))
      .second(0)
      .millisecond(0)
      .toDate();

    const classroom = new Classroom();
    classroom.title = title;
    classroom.subject = subject;
    classroom.classTime = timeAsDate;
    classroom.daysOfTheWeek = daysOfTheWeek;
    classroom.teacher = teacher;

    await this.em.persistAndFlush(classroom);
    return classroom;
  }

  async getClassroomByTeacherId(id: number) {
    const classroomByTeacherId = await this.em.find(Classroom, {
      teacher: id,
    });
    return classroomByTeacherId;
  }

  async getClassroomById(id: number) {
    const classRoom = await this.em.findOne(Classroom, id);
    return classRoom;
  }

  async getClassrooms() {
    const classRoom = await this.em.find(Classroom, {});
    return classRoom;
  }

  async updateClassroom(classroom: Classroom) {
    await this.em.persistAndFlush(classroom);
    return classroom;
  }

  async deleteClassroom(id: number) {
    const classroom = await this.em.findOne(Classroom, id);
    await this.em.nativeDelete(Classroom, id);
    return classroom;
  }
}
