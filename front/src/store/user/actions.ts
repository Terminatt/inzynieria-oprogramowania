// core
import { notification } from "antd";
import { Dispatch } from "react";
import { AppState } from "..";
import axios from "../../axios/axios";
import Utils from "../../utils/utls";
import { ErrorResponse } from "../base/BaseErrorResponse";
import BaseResponse from "../base/BaseResponse";
import { Permission } from "../roles/types";

// redux
import * as CONS from "./constants";
import { LoginPayload, LoginResponse, RegisterPayload, User } from "./types";

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

export const handleUserError = (error?: ErrorResponse | null) => {
  return {
    type: CONS.HANDLE_USER_ERROR,
    error,
  } as const
}

// register user
export const registerUser = (payload: RegisterPayload, cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted())
    try {
      await axios.post<BaseResponse>("/register", payload);
      dispatch(handleFinished())

      notification.success({ message: "Konto zostało utworzone", description: "Na podany adres email został wysłany mail aktywacyjny", duration: 3000 })
      if (cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleUserError(e?.response?.data));
    }
  };
}

// login user
export const loginUser = (payload: LoginPayload, cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted())
    try {
      const results = await axios.post<LoginResponse>("/login", payload);
      dispatch(loginUserFinished(results.data.user))
      dispatch(handleFinished())

      Utils.setToken(results.data.token);
      Utils.setAxiosHeaders(results.data.token, axios);
      dispatch(addToken(results.data.token))

      if (cb) {
        cb();
      }
    }
    catch (e: any) {

      dispatch(handleUserError(e?.response?.data));
    }
  };
}

// is authorized
export const isAuth = (token: string, cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>) => {
    Utils.setAxiosHeaders(token, axios);
    dispatch(handleStarted())
    try {
      const results = await axios.get<LoginResponse>("/isAuth");
      dispatch(loginUserFinished(results.data.user))
      dispatch(handleFinished())

      Utils.setToken(results.data.token);
      Utils.setAxiosHeaders(results.data.token, axios);
      dispatch(addToken(results.data.token))

      if (cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleUserError(e?.response?.data));
    }
  };
}

const loginUserFinished = (data: User) => {
  return {
    type: CONS.LOGIN_USER_FINISHED,
    data,
  } as const
}

const addToken = (token: string) => {
  return {
    type: CONS.ADD_TOKEN,
    token,
  } as const
}


// get permissions
export const getPermissions = (cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>, getState: () => AppState) => {
    dispatch(handleStarted())
    try {
      const user = getState().user.user?.role;
      if(user) {
        const results = await axios.get<BaseResponse<Permission[]>>(`/permissions/${user._id}`);
        if (results.data.documents) {
          dispatch(getPermissionsFinished(results.data.documents))
        }
        dispatch(handleFinished())
      }

      if (cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleUserError(e?.response?.data));
    }
  };
}

const getPermissionsFinished = (data: Permission[]) => {
  return {
    type: CONS.GET_PERMISSIONS_FINISHED,
    data,
  } as const
}


export type UserActions = ReturnType<typeof handleStarted | typeof handleFinished | typeof handleUserError | typeof loginUserFinished
| typeof addToken | typeof getPermissionsFinished
>