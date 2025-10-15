import type { Permission } from "@fludge/entities/permissions.entity";
import type { UserDetail } from "@fludge/entities/user.entity";

export function checkUserPermissions(
  user: UserDetail,
  requiredPermissions: Permission[]
) {
  if (user.isRoot) return true;

  const userPermissions = new Set(
    user.isEmployeeIn?.groups.flatMap((g) => g.permissions)
  );

  return requiredPermissions.every((permission) =>
    userPermissions.has(permission)
  );
}
