import { IsEnum, IsString, IsEmail, IsNotEmpty, MinLength, Matches } from "class-validator";

import { Gender, EducationLevel, Medium } from "@/common/entities/main.enum";

export class CreateStudentListDto {
  @IsNotEmpty()
  @IsString()
  uniqueCode!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  classLevel!: string;

  @IsNotEmpty()
  @IsEnum(EducationLevel, { message: "Invalid education level" })
  educationLevel!: EducationLevel;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsEnum(Gender, { message: "Invalid gender" })
  gender!: Gender;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEnum(Medium, { message: "Invalid medium" })
  medium!: Medium;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/, {
    message:
      "Password must contain at least one uppercase letter, one number, and one special character",
  })
  password!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\+88|01)?(?:\d{11})$/, { message: "Invalid phone number format" })
  phoneNumber!: string;
}
