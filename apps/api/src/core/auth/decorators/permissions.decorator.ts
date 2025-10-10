import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserPermissionsGuard } from '../guards/user-permissions.guard';
import type { Permission } from '@fludge/entities/permissions.entity';

export const META_PERMISSIONS = Symbol('permissioss');

export function Permissions(...args: Permission[]) {
  return applyDecorators(
    SetMetadata(META_PERMISSIONS, args),
    UseGuards(UserPermissionsGuard),
  );
}
