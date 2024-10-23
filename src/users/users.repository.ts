import { Injectable } from "@nestjs/common";

import { EntityRepository, wrap } from "@mikro-orm/postgresql";

import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";

import { User } from "../common/entities/users.entity";
import { RegisterUserDto } from "./users.dtos";

@Injectable()
export class UsersRepository extends EntityRepository<User> {
  async createOne(registerUserDto: RegisterUserDto, role: Role) {
    const {
      email,
      password,
      profileInput: { firstName, lastName, gender, educationLevel, majorSubject },
    } = registerUserDto;

    const user = new User(email, password);
    const userProfile = new UserProfile(firstName, lastName, role);

    wrap(userProfile).assign({
      user,
      role,
      gender,
      majorSubject: majorSubject ?? "",
      educationLevel: educationLevel ?? null,
      medium: medium ?? null,
      highestEducationLevel: highestEducationLevel ?? null,
      subjectsToTeach: subjectsToTeach ?? null,
      classLevel: classLevel ?? null,
      degree: degree ?? null,
      semesterOrYear: semesterOrYear ?? null,
    });
    user.userProfile = userProfile;

    await this.em.persistAndFlush([user, userProfile]);

    return user;
  }
}
