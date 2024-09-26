import { PartialType } from "@nestjs/mapped-types";

import { CreateTeacherListDto } from "./create-teacher-list.dto";

export class UpdateTeacherListDto extends PartialType(CreateTeacherListDto) {}
