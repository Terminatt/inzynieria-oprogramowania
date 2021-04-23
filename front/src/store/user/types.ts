import { BaseEntity } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import BaseResponse from "../base/BaseResponse";

export interface UserState {
  user?: User
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  sex: Sex;
  createdAt: string;
}


export interface LoginPayload extends Pick<User, "email"> {
  password: string;
}

export interface LoginResponse extends BaseResponse<User> {
  token: string;
}

export interface RegisterPayload extends Partial<User> {
  password: string;
}

export enum Sex {
  Male = "male",
  Female = "female",
}