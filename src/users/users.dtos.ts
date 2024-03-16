import { Type } from "class-transformer";
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";

export class UserProfileDto implements Pick<UserProfile, "firstName" | "lastName"> {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastName!: string;
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
