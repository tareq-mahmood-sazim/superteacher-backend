import { Injectable } from "@nestjs/common";

import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";

import { UserProfile } from "@/common/entities/user-profiles.entity";

@Injectable()
export class UserProfilesRepository extends EntityRepository<UserProfile> {
  constructor(em: EntityManager) {
    super(em, UserProfile);
  }
}
