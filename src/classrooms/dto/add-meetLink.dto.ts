import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddMeetLinkDto {
  @IsNumber()
  @IsNotEmpty()
  classroomId!: number;

  @IsNotEmpty()
  @IsString()
  meetLink!: string;
}
