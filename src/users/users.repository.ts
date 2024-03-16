import { Injectable } from "@nestjs/common";

import { wrap } from "@mikro-orm/core";

import argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";
import { EUserRole } from "@/common/enums/roles.enums";
import { CustomRolesRepository } from "@/common/repositories/custom-roles.repository";
import { CustomUserProfilesRepository } from "@/common/repositories/custom-user-profiles.repository";

import { RegisterUserDto } from "./users.dtos";

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

  async create(registerUserDto: RegisterUserDto, roleName: EUserRole = EUserRole.ADMIN) {
    const {
      email,
      password,
      profileInput: { firstName, lastName },
    } = registerUserDto;
    const hashedPassword = await this.hashPassword(password);

    const user = new User(email, hashedPassword);
    const userProfile = new UserProfile(firstName, lastName);

    const role = await this.rolesRepository.findOneOrFail({ name: roleName });

    wrap(userProfile).assign({ user, role });

    await this.em.persistAndFlush([user, userProfile]);

    return userProfile;
  }
}
