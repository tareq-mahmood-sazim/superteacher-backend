import { BadRequestException, Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import * as argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";

import { RolesRepository } from "../roles/roles.repository";
import { UniquecodeRepository } from "../uniquecode/uniquecode.repository";
import { RegisterUserDto } from "./users.dtos";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly uniquecodeRepository: UniquecodeRepository,
  ) {}

  private hashPassword(password: string) {
    return argon2.hash(password, ARGON2_OPTIONS);
  }

  async findByIdOrThrow(id: number) {
    const user = await this.usersRepository.findOneOrFail(id, {
      populate: ["userProfile", "userProfile.role"],
    });
    return user;
  }

  async findByEmailOrThrow(email: string) {
    const user = await this.usersRepository.findOneOrFail(
      {
        email,
      },
      {
        populate: ["userProfile", "userProfile.role"],
      },
    );
    return user;
  }

  async createOne(registerUserDto: RegisterUserDto) {
    const existingUser = await this.usersRepository.findOne({
      email: registerUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const role = await this.rolesRepository.findOneOrFail({
      id: registerUserDto.profileInput.role,
    });

    const hashedPassword = await this.hashPassword(registerUserDto.password);

    if (role.name === "TEACHER") {
      const uniqueCode = await this.uniquecodeRepository.getUniquecode(registerUserDto.email);

      if (!uniqueCode) {
        throw new BadRequestException("Unregistered Email");
      }

      if (uniqueCode.wrongAttempts >= 3) {
        throw new BadRequestException("Too many wrong attempts");
      }

      if (uniqueCode.otp !== registerUserDto.profileInput.uniquecode) {
        await this.uniquecodeRepository.updateWrongAttempt(registerUserDto.email);
        throw new BadRequestException("Wrong Unique Code");
      }

      const newUser = this.usersRepository.createOne(
        {
          ...registerUserDto,
          password: hashedPassword,
        },
        role,
      );

      await this.entityManager.flush();

      await this.uniquecodeRepository.deleteUniquecode(registerUserDto.email);
      await this.entityManager.flush();

      return newUser;
    } else {
      const newUser = this.usersRepository.createOne(
        {
          ...registerUserDto,
          password: hashedPassword,
        },
        role,
      );
      await this.entityManager.flush();
      return newUser;
    }
  }
}
