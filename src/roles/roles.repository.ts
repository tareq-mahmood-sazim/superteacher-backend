import { EntityRepository } from "@mikro-orm/postgresql";

import { Role } from "@/common/entities/roles.entity";

export class RolesRepository extends EntityRepository<Role> {}
