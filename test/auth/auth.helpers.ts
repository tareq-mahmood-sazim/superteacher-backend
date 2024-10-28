import type { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

import { Permission } from "@/common/entities/permissions.entity";
import { Role } from "@/common/entities/roles.entity";
import { EPermission, EUserRole } from "@/common/enums/roles.enums";

export const seedPermissionsData = async (
  dbService: EntityManager<IDatabaseDriver<Connection>>,
): Promise<void> => {
  const studentRole = new Role(EUserRole.STUDENT);
  const superUserRole = new Role(EUserRole.TEACHER);

  const createPermission = new Permission(EPermission.CREATE_USER);
  const readPermission = new Permission(EPermission.READ_USER);
  const updatePermission = new Permission(EPermission.UPDATE_USER);
  const deletePermission = new Permission(EPermission.DELETE_USER);

  studentRole.permissions.add(createPermission);
  studentRole.permissions.add(readPermission);
  studentRole.permissions.add(updatePermission);

  superUserRole.permissions.add(createPermission);
  superUserRole.permissions.add(readPermission);
  superUserRole.permissions.add(updatePermission);
  superUserRole.permissions.add(deletePermission);

  await dbService.persistAndFlush([
    studentRole,
    superUserRole,
    createPermission,
    readPermission,
    updatePermission,
    deletePermission,
  ]);
};
