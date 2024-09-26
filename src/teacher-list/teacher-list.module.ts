import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Teacher } from "@/common/entities/teacher.entity";
import { UniquecodeRepository } from "@/uniquecode/uniquecode.repository";

import { TeacherListController } from "./teacher-list.controller";
import { TeacherListRepository } from "./teacher-list.repository";
import { TeacherListService } from "./teacher-list.service";

@Module({
  imports: [MikroOrmModule.forFeature([Teacher])],
  controllers: [TeacherListController],
  providers: [TeacherListService, TeacherListRepository, UniquecodeRepository],
  exports: [TeacherListService],
})
export class TeacherListModule {}
