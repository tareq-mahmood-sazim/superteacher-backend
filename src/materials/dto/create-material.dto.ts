import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  instructions!: string;

  @IsNotEmpty()
  @IsString()
  dueDate!: string;

  @IsOptional()
  @IsArray()
  attachments!: string[];

  @IsOptional()
  classroom!: number;
}
