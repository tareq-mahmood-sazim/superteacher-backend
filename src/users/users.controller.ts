import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";

import { ITokenizedUser } from "@/auth/auth.interfaces";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { RegisterUserDto, TokenizedUser } from "./users.dtos";
import { UsersSerializer, UsersProfileSerializer } from "./users.serializer";
import { UsersService } from "./users.service";

@UseInterceptors(ResponseTransformInterceptor)
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersSerializer: UsersSerializer,
    private readonly userProfilesSerializer: UsersProfileSerializer,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUser() user: ITokenizedUser): TokenizedUser {
    return user;
  }

  @Get("profile/:id")
  async profile(@Param() params: { id: string }) {
    const userId = parseInt(params.id);
    const profileData = await this.usersService.findByIdOrThrow(userId);
    return this.usersSerializer.serialize(profileData);
  }

  @Post()
  async createUser(@Body() registerUserDto: RegisterUserDto) {
    const data = await this.usersService.createOne(registerUserDto);
    return data;
  }

  @Get("/student/:id")
  async getStudent(@Param() param: { id: string }) {
    const student = await this.usersService.getStudentById(parseInt(param.id));
    return student;
  }
  @Get("/student/search/name/:param")
  async getStudentByName(@Param() param: { param: string }) {
    const student = await this.usersService.getStudentsByName(param.param);
    return this.userProfilesSerializer.serialize(student);
  }
  @Get("/student/search/email/:param")
  async getStudentByEmail(@Param() param: { param: string }) {
    const student = await this.usersService.getStudentsByEmail(param.param);
    return this.userProfilesSerializer.serialize(student);
  }

  @Get("/teacher/:id")
  async getTeacher(@Param() param: { id: string }) {
    const teacher = await this.usersService.getTeacherById(parseInt(param.id));
    return teacher;
  }
}
