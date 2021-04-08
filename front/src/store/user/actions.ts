// core
import { Dispatch } from "react";
import axios from "../../axios/axios";

// redux
import * as CONS from "./constants";
import { LoginPayload, RegisterPayload } from "./types";

// handle loading
const handleStarted = () => {
  return {
    type: CONS.HANDLE_USER_STARTED,
  } as const
}

const handleFinished = () => {
  return {
    type: CONS.HANDLE_USER_FINISHED,
  } as const
}

const handleError = (error: string) => {
  return {
    type: CONS.HANDLE_USER_ERROR,
    error,
  } as const
}

// register user
export const registerUser = (payload: RegisterPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted())
    try {
      const results = await axios.post("/register", payload);
      dispatch(registerUserFinished(results.data))
      dispatch(handleFinished())
    }
    catch (e: any) {
      dispatch(handleError(e));
    }
  };
}

const registerUserFinished = (data: any) => {
  return {
    type: CONS.REGISTER_USER_FINISHED,
    data,
  } as const
}

// login user


export const loginUser = (payload: LoginPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted())
    try {
      const results = await axios.post("/login", payload);
      dispatch(loginUserFinished(results.data))
      dispatch(handleFinished())
    }
    catch (e: any) {
      dispatch(handleError(e));
    }
  };
}

const loginUserFinished = (data: any) => {
  return {
    type: CONS.LOGIN_USER_FINISHED,
    data,
  } as const
}

export type UserActions = ReturnType<typeof handleStarted | typeof handleFinished | typeof handleError |
  typeof registerUserFinished | typeof loginUserFinished
>