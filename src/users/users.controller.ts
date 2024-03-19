import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";

import { ITokenizedUser } from "@/auth/auth.interfaces";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { Roles } from "@/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { EUserRole } from "@/common/enums/roles.enums";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { RegisterUserDto } from "./users.dtos";
import { UserProfilesSerializer } from "./users.serializer";
import { UsersService } from "./users.service";

@UseInterceptors(ResponseTransformInterceptor)
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userProfilesSerializer: UserProfilesSerializer,
  ) {}

  @Get("me")
  me(@CurrentUser() user: ITokenizedUser) {
    return user;
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(EUserRole.SUPER_USER)
  async create(@Body() registerUserDto: RegisterUserDto) {
    const newUser = await this.usersService.create(registerUserDto);
    return this.userProfilesSerializer.serialize(newUser);
  }
}
