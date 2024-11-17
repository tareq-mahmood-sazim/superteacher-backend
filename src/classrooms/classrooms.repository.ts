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

    const timeAsDate = new Date();
    timeAsDate.setHours(Number(hours), Number(minutes), 0, 0);

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
    const classroomByTeacherId = await this.em.find(
      Classroom,
      {
        teacher: id,
      },
      { populate: ["participants"] },
    );
    return classroomByTeacherId;
  }
  async getClassroomParticipantsByTeacherId(id: number, classroomId: number) {
    const classroomByTeacherId = await this.em.find(
      Classroom,
      {
        teacher: id,
        id: classroomId,
      },
      { populate: ["participants"] },
    );
    const getParticipants = classroomByTeacherId;
    return getParticipants;
  }

  async addStudentInClassroom(studentIds: number[], classroomId: number, teacherId: number) {
    const classroom = await this.em.findOne(Classroom, {
      id: classroomId,
      teacher: teacherId,
    });
    if (!classroom) return { message: "Classroom not found" };

    await this.em.begin();

    try {
      for (const studentId of studentIds) {
        const student = await this.em.findOne(UserProfile, {
          id: studentId,
        });

        if (!student) throw new Error(`Student with ID ${studentId} not found`);

        classroom.participants.add(student);
      }

      await this.em.persistAndFlush(classroom);
      await this.em.commit();

      return { message: "Students added successfully", classroom };
    } catch (err: unknown) {
      await this.em.rollback();
      const error = err as { code?: string; message: string };
      if (error.code === "23505") {
        return { message: "One or more students are already added to this classroom." };
      }
      throw error;
    }
  }

  async removeStudentFromClassroom(studentId: number, classroomId: number, teacherId: number) {
    const classroom = await this.em.findOne(
      Classroom,
      {
        id: classroomId,
        teacher: teacherId,
      },
      { populate: ["participants"] },
    );
    if (!classroom) return { message: "Classroom not found" };

    const student = await this.em.findOne(UserProfile, {
      id: studentId,
      role: { name: EUserRole.STUDENT },
    });
    if (!student) return { message: "Student not found" };
    if (!classroom.participants.contains(student)) {
      return { message: "Student is not a participant in this classroom" };
    }
    classroom.participants.remove(student);
    try {
      const participantsDetail = await this.em.persistAndFlush(classroom);
      return participantsDetail;
    } catch (err: unknown) {
      const error = err as { code: string; message: string };
      if (error.code === "23505") {
        return { message: error.message };
      }
      throw error;
    }
  }

  async getClassroomById(id: number) {
    const classRoom = await this.em.findOne(Classroom, id, { populate: ["participants"] });
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
