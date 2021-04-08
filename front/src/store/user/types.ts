export interface UserState {
  user?: User
  isLoading: boolean;
  error: string;
}

export interface User {
  name: string;
  sex: Gender;
}


export interface LoginPayload extends Pick<User, "name"> {
  password: string;
}

export interface RegisterPayload extends User {
  password: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
}