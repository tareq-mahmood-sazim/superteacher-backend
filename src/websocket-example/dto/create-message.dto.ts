import { IsInt, IsOptional, IsString } from "class-validator";

import { UserType } from "@/common/enums/main.enum";

export class CreateMessageDto {
  @IsString()
  content!: string;

  @IsOptional()
  sender!: number;

  @IsString()
  senderType!: UserType;

  @IsInt()
  classroom!: number;
}
