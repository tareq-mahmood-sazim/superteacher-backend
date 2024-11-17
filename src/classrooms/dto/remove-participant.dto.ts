import { IsNotEmpty, IsNumber } from "class-validator";

export class RemoveParticipantDto {
  @IsNumber()
  @IsNotEmpty()
  classroomId!: number;

  @IsNumber()
  @IsNotEmpty()
  studentId!: number;
}
