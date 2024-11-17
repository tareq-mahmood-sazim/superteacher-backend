import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class AddParticipantDto {
  @IsNumber()
  @IsNotEmpty()
  classroomId!: number;

  @IsArray()
  @IsNotEmpty()
  studentIds!: number[];
}
