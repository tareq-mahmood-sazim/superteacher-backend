import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";

import { ITokenizedUser } from "@/auth/auth.interfaces";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { UsersService } from "./users.service";

@UseInterceptors(ResponseTransformInterceptor)
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  me(@CurrentUser() user: ITokenizedUser) {
    return user;
  }
}
