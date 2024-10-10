import { Injectable } from "@nestjs/common";

import { EntityRepository } from "@mikro-orm/postgresql";

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
      profileInput: {
        firstName,
        lastName,
        gender,
        educationLevel,
        majorSubject,
        subjectsToTeach,
        medium,
        classLevel,
        degree,
        semesterOrYear,
        highestEducationLevel,
      },
    } = registerUserDto;

    const user = new User(email, password);

    const userProfile = new UserProfile(firstName, lastName, role);
    userProfile.gender = gender;
    userProfile.majorSubject = majorSubject ?? "";

    if (educationLevel && educationLevel.length > 0) {
      userProfile.educationLevel = educationLevel;
    }
    if (medium && medium.length > 0) {
      userProfile.medium = medium;
    }
    if (highestEducationLevel && highestEducationLevel.length > 0) {
      userProfile.highestEducationLevel = highestEducationLevel;
    }
    if (subjectsToTeach) {
      userProfile.subjectsToTeach = subjectsToTeach;
    }
    if (classLevel) {
      userProfile.classLevel = classLevel;
    }
    if (degree) {
      userProfile.degree = degree;
    }
    if (semesterOrYear) {
      userProfile.semesterOrYear = semesterOrYear;
    }

    userProfile.role = role;
    user.userProfile = userProfile;
    userProfile.user = user;

    await this.em.persistAndFlush([user, userProfile]);

    return user;
  }
}
