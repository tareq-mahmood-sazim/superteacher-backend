import { Injectable } from "@nestjs/common";

import { EntityRepository, wrap } from "@mikro-orm/postgresql";

import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { EUserRole } from "@/common/enums/roles.enums";

import { User } from "../common/entities/users.entity";
import { RegisterUserDto } from "./users.dtos";

@Injectable()
export class UsersRepository extends EntityRepository<User> {
  async createOne(registerUserDto: RegisterUserDto, role: Role) {
    const { email, password, profileInput } = registerUserDto;
    const {
      firstName,
      lastName,
      gender,
      majorSubject,
      educationLevel,
      medium,
      highestEducationLevel,
      subjectsToTeach,
      classLevel,
      degree,
      semesterOrYear,
    } = profileInput;

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

    await this.em.persistAndFlush(user);

    return user;
  }

  async getOneTeacherById(id: number) {
    const teacherProfile = await this.em.findOne(
      UserProfile,
      {
        id,
        role: { name: EUserRole.TEACHER },
      },
      {
        populate: ["user", "subjectsToTeach"],
      },
    );
    return teacherProfile;
  }

  async getOneStudentById(id: number) {
    const studentProfile = await this.em.findOne(
      UserProfile,
      {
        id,
        role: { name: EUserRole.STUDENT },
      },
      {
        populate: ["user", "classLevel"],
      },
    );
    return studentProfile;
  }

  async getOneStudentByEmail(email: string) {
    const studentProfile = await this.em.findOne(
      UserProfile,
      {
        user: {
          email: { $ilike: `%${email}%` },
        },
        role: { name: EUserRole.STUDENT },
      },
      {
        populate: ["user"],
      },
    );
    return studentProfile;
  }

  async getOneStudentByFirstOrLastName(param: string) {
    const studentProfile = await this.em.find(
      UserProfile,
      {
        role: { name: EUserRole.STUDENT },
        $or: [{ firstName: { $ilike: `%${param}%` } }, { lastName: { $ilike: `%${param}%` } }],
      },
      {
        populate: ["user"],
      },
    );
    return studentProfile;
  }
}
