import { ErrorResponse } from "../base/BaseErrorResponse";

export interface UserState {
  user?: User
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface User {
  name: string;
  email: string;
  sex: Sex;
}


export interface LoginPayload extends Pick<User, "email"> {
  password: string;
}

export interface RegisterPayload extends Partial<User> {
  password: string;
}

export enum Sex {
  Male = "male",
  Female = "female",
}