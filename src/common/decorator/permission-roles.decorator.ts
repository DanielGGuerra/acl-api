import { SetMetadata } from '@nestjs/common';

export enum Action {
  all = 'all',
  create = 'create',
  update = 'update',
  read = 'read',
  delete = 'delete',
}

export interface IPermissionMetadata {
  controller: string;
  action: Action;
  notRequired?: boolean;
}

export const PERMISSION_ROLES = 'permission_roles';

export const RequiredPermission = (permissionMetadata: IPermissionMetadata) =>
  SetMetadata(PERMISSION_ROLES, permissionMetadata);

export const NotRequiredPermission = () =>
  SetMetadata(PERMISSION_ROLES, { notRequired: true });
