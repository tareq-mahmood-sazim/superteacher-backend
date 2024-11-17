import { PartialType } from "@nestjs/swagger";

import { IsArray, IsOptional, IsBoolean } from "class-validator";

import { CreateSubmissionDto } from "./create-submission.dto";

export class UpdateSubmissionDto extends PartialType(CreateSubmissionDto) {
  @IsOptional()
  @IsArray()
  attachment?: string[];

  @IsOptional()
  @IsBoolean()
  isLate?: boolean;
}
