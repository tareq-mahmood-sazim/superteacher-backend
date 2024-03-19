import { BadRequestException, Injectable } from "@nestjs/common";

import * as argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";
import { CustomUsersRepository } from "@/common/repositories/custom-users.repository";

import { RegisterUserDto } from "./users.dtos";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly customUserRepository: CustomUsersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  private hashPassword(password: string) {
    return argon2.hash(password, ARGON2_OPTIONS);
  }

  async findByIdOrThrow(id: number) {
    const user = await this.customUserRepository.findOneOrFail(id, {
      populate: ["userProfile", "userProfile.role"],
    });
    return user;
  }

  async findByEmailOrThrow(email: string) {
    const user = await this.customUserRepository.findOneOrFail(
      {
        email,
      },
      {
        populate: ["userProfile", "userProfile.role"],
      },
    );
    return user;
  }

  async create(registerUserDto: RegisterUserDto) {
    const existingUser = await this.customUserRepository.findOne({
      email: registerUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const newUser = await this.usersRepository.create({
      ...registerUserDto,
      password: await this.hashPassword(registerUserDto.password),
    });

    return newUser;
  }
}
