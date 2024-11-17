import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

import { ITokenizedUser } from "@/auth/auth.interfaces";
import { EducationLevel, Gender } from "@/common/entities/main.enum";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";
import { Degree, Medium } from "@/common/enums/main.enum";
import { EUserRole } from "@/common/enums/roles.enums";
import { RoleResponse } from "@/roles/roles.dtos";

export class UserProfileDto implements Pick<UserProfile, "firstName" | "lastName"> {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastName!: string;

  @IsEnum(Gender)
  gender!: Gender;

  @IsString()
  @IsOptional()
  educationLevel?: EducationLevel | undefined;

  @IsOptional()
  @IsString()
  majorSubject?: string;

  @IsOptional()
  @IsInt()
  role?: number;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(16)
  uniquecode?: string;

  @IsArray()
  @IsOptional()
  subjectsToTeach?: string[];

  @IsString()
  @IsOptional()
  medium?: Medium | undefined;

  @IsString()
  @IsOptional()
  @MaxLength(24)
  classLevel?: string;

  @IsString()
  @IsOptional()
  degree?: Degree;

  @IsString()
  @IsOptional()
  semesterOrYear?: string;

  @IsString()
  @IsOptional()
  highestEducationLevel?: Degree | undefined;
}

export class RegisterUserDto implements Pick<User, "email" | "password"> {
  @IsString()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string = process.env.DEFAULT_PASSWORD as string;

  @IsObject()
  @ValidateNested()
  @Type(() => UserProfileDto)
  profileInput!: UserProfileDto;
}

export class UserResponse {
  id!: number;
  email!: string;
  createdAt!: string | Date;
  updatedAt!: string | Date;
  userProfile!: UserProfileResponse;
  accessToken!: string;
}

export class UserProfileResponse {
  id!: number;
  createdAt!: string;
  updatedAt!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: RoleResponse;
}

export class TokenizedUser implements ITokenizedUser {
  id!: number;
  claimId!: number;
  claim!: EUserRole;
  userProfileId!: number;
  email!: string;
}
