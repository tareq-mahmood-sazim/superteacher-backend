import { IsEmail, IsString } from "class-validator";

export class SendMailerAppDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  readonly subject!: string;

  @IsString()
  readonly message!: string;
}
