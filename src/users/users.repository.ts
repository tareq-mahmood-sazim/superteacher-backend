import { EntityRepository, wrap } from "@mikro-orm/postgresql";

import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";

import { User } from "../common/entities/users.entity";
import { RegisterUserDto } from "./users.dtos";

export class UsersRepository extends EntityRepository<User> {
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
