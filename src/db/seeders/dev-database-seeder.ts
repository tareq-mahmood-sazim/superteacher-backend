import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

import * as argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";
import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";
import { Gender } from "@/common/enums/main.enum";
import { EUserRole } from "@/common/enums/roles.enums";

export class DevDatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    this.createRoles(em);
    await this.createTestUser(em);
    await em.flush();
  }

  createRoles(em: EntityManager) {
    const teacherRole = new Role(EUserRole.TEACHER);
    const STUDENTRole = new Role(EUserRole.STUDENT);

    em.persist([teacherRole, STUDENTRole]);
  }

  async createTestUser(em: EntityManager) {
    const email = "test@test.app";
    const hashedPassword = await argon2.hash("test123", ARGON2_OPTIONS);

    const user = new User(email, hashedPassword);
    const role = new Role(EUserRole.STUDENT);
    const userProfile = new UserProfile("Test", "User", role);
    userProfile.role = em.getReference(Role, 1);
    userProfile.gender = Gender.MALE;
    userProfile.major = "Computer Science";

    user.userProfile = userProfile;

    em.persist(user);
  }
}
