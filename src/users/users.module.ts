import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { User } from "@/common/entities/users.entity";
import { RolesModule } from "@/roles/roles.module";
import { UniquecodeRepository } from "@/uniquecode/uniquecode.repository";

import { UsersController } from "./users.controller";
import { UsersSerializer, UsersProfileSerializer } from "./users.serializer";
import { UsersService } from "./users.service";

@Module({
  imports: [RolesModule, MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersSerializer, UniquecodeRepository, UsersProfileSerializer],
  exports: [
    UsersService,
    UsersSerializer,
    UsersProfileSerializer,
    MikroOrmModule.forFeature([User]),
    UniquecodeRepository,
  ],
})
export class UsersModule {}
