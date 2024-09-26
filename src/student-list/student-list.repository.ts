import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import { Student } from "@/common/entities/student.entity";

import { CreateStudentListDto } from "./dto/create-student-list.dto";
import { UpdateStudentListDto } from "./dto/update-student-list.dto";

@Injectable()
export class StudentListRepository {
  constructor(private readonly em: EntityManager) {}

  async createStudent(createStudentListDto: CreateStudentListDto): Promise<Student> {
    const student = new Student();
    Object.assign(student, createStudentListDto);
    try {
      await this.em.persistAndFlush(student);
      return student;
    } catch (error: unknown) {
      console.log(error);
      throw new Error("Failed to create student, student already exists");
    }
  }

  findOne(id: string): Promise<Student | null> {
    return this.em.findOne(Student, { id });
  }

  findAll(): Promise<Student[]> {
    return this.em.find(Student, {});
  }

  async updateStudent(id: string, updateStudentListDto: UpdateStudentListDto): Promise<Student> {
    const student = await this.em.findOne(Student, { id });
    if (!student) {
      throw new Error("Student not found");
    }
    this.em.assign(student, updateStudentListDto);
    await this.em.flush();
    return student;
  }

  async deleteStudent(id: string): Promise<void> {
    const student = await this.em.findOne(Student, { id });
    if (student) {
      await this.em.removeAndFlush(student);
    }
  }
}
