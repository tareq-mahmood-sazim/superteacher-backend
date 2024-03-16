import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

import { faker } from "@faker-js/faker";

import { Role } from "@/common/entities/roles.entity";
import { EUserRole } from "@/common/enums/roles.enums";

import { MOCK_AUTH_EMAIL, MOCK_AUTH_PASS_HASHED } from "../../auth/auth.mock";
import { UserFactory, UserProfileFactory } from "../factories/users.factory";

export const createUserInDb = async (
  dbService: EntityManager<IDatabaseDriver<Connection>>,
  config?: {
    email?: string;
    password?: string;
    roleName?: EUserRole;
    businessName?: string;
    cellPhoneNo?: string;
  },
) => {
  const defaultConfig = {
    email: MOCK_AUTH_EMAIL,
    password: MOCK_AUTH_PASS_HASHED,
    roleName: EUserRole.ADMIN,
    businessName: faker.company.name(),
    cellPhoneNo: faker.phone.number(),
  };

  const values = {
    ...defaultConfig,
    ...config,
  };
  const user = new UserFactory(dbService).makeOne({
    email: values.email,
    password: values.password,
  });
  const userProfile = new UserProfileFactory(dbService).makeOne();
  const role = await dbService.findOneOrFail(Role, { name: values.roleName });

  user.userProfile = userProfile;
  userProfile.user = user;
  userProfile.role = role;

  await dbService.flush();

  return userProfile;
};
