import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Classroom } from "@/common/entities/classroom.entity";

import { ClassroomsController } from "./classrooms.controller";
import { ClassroomRepository } from "./classrooms.repository";
import { ClassroomsService } from "./classrooms.service";

@Module({
  imports: [MikroOrmModule.forFeature([Classroom])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService, ClassroomRepository],
})
export class ClassroomsModule {}
