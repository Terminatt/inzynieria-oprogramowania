import { BaseEntity, Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import { Role } from "../user/types";

export interface RoleState {
  
  collection: Role[];
  selected: Role | null;
  isLoading: boolean;
  error?: ErrorResponse | null;
  permissionTypes: Permissions | null;

  permissionsCollection: Permission[];
}

export interface RolePayload {
  name: string;
}

export interface Permissions {
  Ebook: string[],
  Category: string[],
  User: string[],
  Role: string[]
}

export interface Permission extends BaseEntity {
  permissions: string[],
  entityName: string,
  role: Id,
}