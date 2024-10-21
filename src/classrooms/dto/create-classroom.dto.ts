import { IsNotEmpty, IsString, IsArray, Matches, MaxLength, MinLength } from "class-validator";

export class CreateClassroomDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(48)
  @MinLength(2)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(48)
  @MinLength(2)
  subject!: string;

  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "classTime must be a valid time string (HH:mm)",
  })
  classTime!: string;

  @IsNotEmpty()
  @IsArray()
  daysOfTheWeek!: string[];
}
