import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsArray,
  ArrayMinSize,
  Matches,
} from "class-validator";

import { Degree } from "@/common/entities/main.enum";

export class CreateTeacherListDto {
  @IsNotEmpty({ message: "Unique Code is required" })
  @IsString()
  uniqueCode!: string;

  @IsNotEmpty({ message: "First name is required" })
  @IsString()
  firstName!: string;

  @IsNotEmpty({ message: "Last name is required" })
  @IsString()
  lastName!: string;

  @IsNotEmpty({ message: "Gender is required" })
  @IsString()
  gender!: "MALE" | "FEMALE" | "OTHERS";

  @IsNotEmpty({ message: "Highest education level is required" })
  @IsEnum(Degree, { message: "Highest education level must be one of the valid options" })
  highestEducationLevel!: Degree;

  @IsNotEmpty({ message: "Major subject is required" })
  @IsString()
  majorSubject!: string;

  @IsArray()
  @ArrayMinSize(1, { message: "At least one subject to teach is required" })
  @IsString({ each: true })
  subjectsToTeach!: string[];

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Email must be valid" })
  email!: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      "Password must contain at least one uppercase letter, one number, and one special character",
  })
  password!: string;
}
