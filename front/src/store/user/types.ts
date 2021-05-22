import { BaseEntity } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";

export interface UserState {
  user?: User
  isLoading: boolean;
  error?: ErrorResponse | null;
  token: string | null;
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

export enum Sex {
  Male = "male",
  Female = "female",
}