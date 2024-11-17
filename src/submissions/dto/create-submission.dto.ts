import { IsArray, IsNumber } from "class-validator";

export class CreateSubmissionDto {
  @IsNumber()
  materialId!: number;
  @IsNumber()
  userId!: number;
  @IsArray()
  attachment!: string[];
}
