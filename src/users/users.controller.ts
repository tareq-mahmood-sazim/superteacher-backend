import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, ForbiddenException } from "@nestjs/common";

import { ITokenizedUser } from "@/auth/auth.interfaces";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { RegisterUserDto, TokenizedUser, UserResponse } from "./users.dtos";
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

  @UseGuards(JwtAuthGuard)
  @Get("profile/:id")
  async profile(@Param() params: { id: string }) {
    if(!params.id) return new ForbiddenException("Profile ID was not provided");
    const userId = parseInt(params.id);
    const profileData = await this.usersService.findByIdOrThrow(userId);
    return this.usersSerializer.serialize(profileData);
  }

  @Post()
  async createUser(@Body() registerUserDto: RegisterUserDto): Promise<UserResponse> {
    const newUser = await this.usersService.createOne(registerUserDto);
    return this.usersSerializer.serialize(newUser);
  }

  @Get("/student/:id")
  async getStudent(@Param() param: { id: string }) {
    if(!param.id) return new ForbiddenException("Student ID was not provided");
    const student = await this.usersService.getStudentById(parseInt(param.id));
    return student;
  }
  @Get("/student/search/name/:param")
  async getStudentByName(@Param() param: { param: string }) {
    if(!param.param) return new ForbiddenException("Student Name was not provided");
    const student = await this.usersService.getStudentsByName(param.param);
    return this.userProfilesSerializer.serialize(student);
  }
  @Get("/student/search/email/:param")
  async getStudentByEmail(@Param() param: { param: string }) {
    if(!param.param) return new ForbiddenException("Student mail was not provided");
    const student = await this.usersService.getStudentsByEmail(param.param);
    return this.userProfilesSerializer.serialize(student);
  }

  @Get("/teacher/:id")
  async getTeacher(@Param() param: { id: string }) {
    if(!param.id) return new ForbiddenException("Teacher ID was not provided");
    const teacher = await this.usersService.getTeacherById(parseInt(param.id));
    return teacher;
  }
}
