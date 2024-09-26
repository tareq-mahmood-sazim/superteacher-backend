import { Injectable } from "@nestjs/common";

import { CreateStudentListDto } from "./dto/create-student-list.dto";
import { UpdateStudentListDto } from "./dto/update-student-list.dto";
import { StudentListRepository } from "./student-list.repository";

@Injectable()
export class StudentListService {
  constructor(private readonly studentRepository: StudentListRepository) {}

  async create(createStudentListDto: CreateStudentListDto) {
    const student = await this.studentRepository.createStudent(createStudentListDto);
    return {
      message: "Student created successfully",
      data: {
        name: `${student.firstName} ${student.lastName}`,
        email: student.email,
        phoneNumber: student.phoneNumber,
      },
      status: 200,
    };
  }

  findAll() {
    return this.studentRepository.findAll();
  }

  findOne(id: string) {
    return this.studentRepository.findOne(id);
  }

  async update(id: string, updateStudentListDto: UpdateStudentListDto) {
    const updatedStudent = await this.studentRepository.updateStudent(id, updateStudentListDto);
    return {
      message: "Student updated successfully",
      data: updatedStudent,
      status: 200,
    };
  }

  async remove(id: string) {
    await this.studentRepository.deleteStudent(id);
    return {
      message: "Student deleted successfully",
      status: 200,
    };
  }
}
