import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { TokenizedUser } from "@/users/users.dtos";

import { ClassroomsService } from "./classrooms.service";
import { AddParticipantDto } from "./dto/add-participant.dto";
import { CreateClassroomDto } from "./dto/create-classroom.dto";
import { RemoveParticipantDto } from "./dto/remove-participant.dto";
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
  @UseGuards(JwtAuthGuard)
  @Post("/addParticipant")
  addStudentInClassroom(
    @Body() addParticipantDto: AddParticipantDto,
    @Req() req: { user: TokenizedUser },
  ) {
    const teacherId = req.user.id;
    return this.classroomsService.addStudentToClassroom(addParticipantDto, teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: { user: TokenizedUser }) {
    const teacherId = req.user.id;
    return this.classroomsService.findAllById(teacherId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.classroomsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Get("participants/:id")
  GetParticipantsByTeacherId(@Req() req: { user: TokenizedUser }, @Param("id") id: string) {
    const teacherId = req.user.id;
    return this.classroomsService.findAllParticipantsByTeacherId(teacherId, parseInt(id));
  }
  @UseGuards(JwtAuthGuard)
  @Post("participants/remove")
  RemoveParticipant(
    @Req() req: { user: TokenizedUser },
    @Body() removeParticipantDto: RemoveParticipantDto,
  ) {
    const teacherId = req.user.id;
    return this.classroomsService.removeStudentFromClassroom(removeParticipantDto, teacherId);
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
