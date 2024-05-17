import { Collection, Entity, Enum, ManyToMany, PrimaryKey } from "@mikro-orm/core";
import { EntityRepositoryType } from "@mikro-orm/postgresql";

import { EUserRole } from "@/common/enums/roles.enums";
import { RolesRepository } from "@/roles/roles.repository";

import { CustomBaseEntity } from "./custom-base.entity";
import { Permission } from "./permissions.entity";

@Entity({
  tableName: "roles",
  repository: () => RolesRepository,
})
export class Role extends CustomBaseEntity {
  [EntityRepositoryType]?: RolesRepository;

  constructor(name: EUserRole) {
    super();

    this.name = name;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Enum(() => EUserRole)
  name!: EUserRole;

  @ManyToMany(() => Permission, (permission) => permission.roles, { owner: true })
  permissions = new Collection<Permission>(this);
}
