import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";

import { CreateStudentListDto } from "./dto/create-student-list.dto";
import { UpdateStudentListDto } from "./dto/update-student-list.dto";
import { StudentListService } from "./student-list.service";

@Controller("student-list")
export class StudentListController {
  constructor(private readonly studentListService: StudentListService) {}

  @Post()
  create(@Body() createStudentListDto: CreateStudentListDto) {
    return this.studentListService.create(createStudentListDto);
  }

  @Get()
  findAll() {
    return this.studentListService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.studentListService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStudentListDto: UpdateStudentListDto) {
    return this.studentListService.update(id, updateStudentListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.studentListService.remove(id);
  }
}
