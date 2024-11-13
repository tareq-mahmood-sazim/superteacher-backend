import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  instructions!: string;

  @IsNotEmpty()
  @IsDate()
  dueDate!: Date;

  @IsOptional()
  @IsArray()
  attachments!: string[];

  @IsOptional()
  classroomId!: number;
}
