import { Injectable } from "@nestjs/common";

import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";

import { Role } from "@/common/entities/roles.entity";

@Injectable()
export class RolesRepository extends EntityRepository<Role> {
  constructor(em: EntityManager) {
    super(em, Role);
  }
}
