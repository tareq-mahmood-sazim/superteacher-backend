import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";

import { ITokenizedUser } from "@/auth/auth.interfaces";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { RegisterUserDto, TokenizedUser, UserResponse } from "./users.dtos";
import { UsersSerializer } from "./users.serializer";
import { UsersService } from "./users.service";

@UseInterceptors(ResponseTransformInterceptor)
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersSerializer: UsersSerializer,
  ) {}
  @Get("me")
  me(@CurrentUser() user: ITokenizedUser): TokenizedUser {
    return user;
  }
  @UseGuards(JwtAuthGuard)
  @Get("profile/:id")
  async profile(@Param() params: { id: string }): Promise<UserResponse> {
    const userId = parseInt(params.id);
    const profileData = await this.usersService.findByIdOrThrow(userId);
    return this.usersSerializer.serialize(profileData);
  }

  @Post()
  async createUser(@Body() registerUserDto: RegisterUserDto): Promise<UserResponse> {
    const newUser = await this.usersService.createOne(registerUserDto);
    return this.usersSerializer.serialize(newUser);
  }
}
