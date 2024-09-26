import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Student } from "@/common/entities/student.entity";

import { StudentListController } from "./student-list.controller";
import { StudentListRepository } from "./student-list.repository";
import { StudentListService } from "./student-list.service";

@Module({
  imports: [MikroOrmModule.forFeature([Student])],
  controllers: [StudentListController],
  providers: [StudentListService, StudentListRepository],
  exports: [StudentListService],
})
export class StudentListModule {}
