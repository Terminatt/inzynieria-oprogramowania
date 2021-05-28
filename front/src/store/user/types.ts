import { BaseEntity, Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import { Permission } from "../roles/types";

export interface UserState {
  user?: User
  isLoading: boolean;
  error?: ErrorResponse | null;
  token: string | null;
  permissions: Permission[];
  userCollection: User[];
  selectedUser: User | null;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  sex: Sex;
  role: Role;
}

export interface Role extends BaseEntity {
  name: string;
  superAdmin: boolean;
  deletable: boolean;
}


export interface LoginPayload extends Pick<User, "email"> {
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterPayload extends Partial<User> {
  password: string;
}

export interface UserPayload extends Pick<User, '_id' | 'name' | 'email' | 'sex'>{
  role: Id;
}

export enum Sex {
  Male = "male",
  Female = "female",
}