import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { TokenizedUser } from "@/users/users.dtos";

import { ClassroomsService } from "./classrooms.service";
import { CreateClassroomDto } from "./dto/create-classroom.dto";
import { UpdateClassroomDto } from "./dto/update-classroom.dto";

@Controller("classrooms")
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto, @Req() req: { user: TokenizedUser }) {
    const teacherId = req.user.id;
    return this.classroomsService.create(createClassroomDto, teacherId);
  }

  @Get()
  findAll() {
    return this.classroomsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.classroomsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomsService.update(+id, updateClassroomDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.classroomsService.remove(+id);
  }
}
