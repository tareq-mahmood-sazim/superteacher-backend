import { EUserRole } from "@/common/enums/roles.enums";

export interface IJwtPayload {
  sub: number;
  email: string;
  claimId: number;
}

export interface ITokenizedUser extends Omit<IJwtPayload, "sub"> {
  id: number;
  claimId: number;
  claim: EUserRole;
  userProfileId: number;
}
