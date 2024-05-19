import { Module } from "@nestjs/common";

import { RolesModule } from "@/roles/roles.module";

import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersSerializer } from "./users.serializer";
import { UsersService } from "./users.service";

@Module({
  imports: [RolesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersSerializer],
  exports: [UsersService, UsersRepository, UsersSerializer],
})
export class UsersModule {}
