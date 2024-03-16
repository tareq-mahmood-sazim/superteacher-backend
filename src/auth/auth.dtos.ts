import { ITokenizedUser } from "@/auth/auth.interfaces";

export class LoginResponseDto {
  accessToken!: string;
  user!: ITokenizedUser;
}
