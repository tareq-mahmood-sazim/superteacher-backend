import { Injectable } from "@nestjs/common";

import { EntityManager, EntityRepository, wrap } from "@mikro-orm/postgresql";

import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { RolesRepository } from "@/roles/roles.repository";

import { User } from "../common/entities/users.entity";
import { RegisterUserDto } from "./users.dtos";

@Injectable()
export class UsersRepository extends EntityRepository<User> {
  constructor(em: EntityManager, private readonly rolesRepository: RolesRepository) {
    super(em, User);
  }

  async createUser(registerUserDto: RegisterUserDto, role: Role) {
    const {
      email,
      password,
      profileInput: { firstName, lastName },
    } = registerUserDto;

    const user = new User(email, password);
    const userProfile = new UserProfile(firstName, lastName);

    wrap(userProfile).assign({ user, role });

    await this.em.persistAndFlush([user, userProfile]);

    return user;
  }
}
