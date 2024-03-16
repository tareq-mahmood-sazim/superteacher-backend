import { Injectable } from "@nestjs/common";

import { User } from "@/common/entities/users.entity";
import { CustomUserProfilesRepository } from "@/common/repositories/custom-user-profiles.repository";
import { CustomUsersRepository } from "@/common/repositories/custom-users.repository";

import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly customUserRepository: CustomUsersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly userProfileRepository: CustomUserProfilesRepository,
  ) {}

  async findByIdOrThrow(id: number, includePassword = false) {
    const user = await this.customUserRepository.findOneOrFail(id, {
      populate: ["userProfile", "userProfile.role"],
    });
    return this.serialize(user, {
      includePassword,
    });
  }

  async findByEmailOrThrow(email: string, includePassword = false) {
    const user = await this.customUserRepository.findOneOrFail(
      {
        email,
      },
      {
        populate: ["userProfile", "userProfile.role"],
      },
    );
    return this.serialize(user, {
      includePassword,
    });
  }

  serialize(
    user: User,
    opts = {
      includePassword: false,
    },
  ) {
    const { includePassword } = opts;

    const serializedUser: User = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userProfile: user.userProfile,
    };

    if (includePassword) {
      serializedUser.password = user.password;
    }

    return serializedUser;
  }
}
