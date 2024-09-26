import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { CreateTeacherListDto } from "./dto/create-teacher-list.dto";
import { UpdateTeacherListDto } from "./dto/update-teacher-list.dto";
import { TeacherListService } from "./teacher-list.service";

@Controller("teacher-list")
export class TeacherListController {
  constructor(private readonly teacherListService: TeacherListService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTeacherListDto: CreateTeacherListDto) {
    return this.teacherListService.create(createTeacherListDto);
  }

  @Get()
  findAll() {
    return this.teacherListService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.teacherListService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTeacherListDto: UpdateTeacherListDto) {
    return this.teacherListService.update(+id, updateTeacherListDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teacherListService.remove(+id);
  }
}
