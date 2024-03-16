import { BadRequestException, Injectable } from "@nestjs/common";

import { CustomUsersRepository } from "@/common/repositories/custom-users.repository";

import { RegisterUserDto } from "./users.dtos";
import { UsersRepository } from "./users.repository";
import { UsersSerializer } from "./users.serializer";

@Injectable()
export class UsersService {
  constructor(
    private readonly customUserRepository: CustomUsersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly usersSerializer: UsersSerializer,
  ) {}

  async findByIdOrThrow(id: number, includePassword = false) {
    const user = await this.customUserRepository.findOneOrFail(id, {
      populate: ["userProfile", "userProfile.role"],
    });
    return this.usersSerializer.serializeUser(user, { includePassword });
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
    return this.usersSerializer.serializeUser(user, { includePassword });
  }

  async create(registerUserDto: RegisterUserDto) {
    const existingUser = await this.customUserRepository.findOne({
      email: registerUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const newUser = await this.usersRepository.create(registerUserDto);
    return this.usersSerializer.serializeUserProfile(newUser, { includePassword: false });
  }
}
