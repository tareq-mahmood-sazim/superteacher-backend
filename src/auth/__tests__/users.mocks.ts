import { Role } from "@/common/entities/roles.entity";

import { User } from "@/common/entities/users.entity";
import { EUserRole } from "@/common/enums/roles.enums";

export const MOCK_USER = new User(
  "test.user.x@email.com",
  "$argon2i$v=19$m=16,t=2,p=1$MTIzNDU2Nzg$0UUB6E64WB9X/Tp5NC4DKw",
);

export const MOCK_USER_ROLE = new Role(EUserRole.STUDENT);
MOCK_USER_ROLE.id = 1;

