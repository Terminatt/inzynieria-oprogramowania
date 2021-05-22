import { ErrorResponse } from "../base/BaseErrorResponse";
import { Role } from "../user/types";

export interface RoleState {
  
  collection: Role[];
  selected: Role | null;
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface RolePayload {
  name: string;
}

export interface Acl {

}