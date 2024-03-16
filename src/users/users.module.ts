import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";

import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersSerializer } from "./users.serializer";
import { UsersService } from "./users.service";

@Module({
  imports: [MikroOrmModule.forFeature([User, UserProfile, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersSerializer],
  exports: [UsersService, UsersRepository, UsersSerializer],
})
export class UsersModule {}
