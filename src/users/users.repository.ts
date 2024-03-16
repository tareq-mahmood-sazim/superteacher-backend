import { Injectable } from "@nestjs/common";

import argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";
import { CustomRolesRepository } from "@/common/repositories/custom-roles.repository";
import { CustomUserProfilesRepository } from "@/common/repositories/custom-user-profiles.repository";

@Injectable()
export class UsersRepository {
  private readonly em;

  constructor(
    private readonly userProfileRepository: CustomUserProfilesRepository,
    private readonly rolesRepository: CustomRolesRepository,
  ) {
    this.em = this.userProfileRepository.getEntityManager();
  }

  private hashPassword(password: string) {
    return argon2.hash(password, ARGON2_OPTIONS);
  }
}
