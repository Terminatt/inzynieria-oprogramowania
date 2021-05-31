// core
import { notification } from "antd";
import { Dispatch } from "react";
import { AppState } from "..";
import axios from "../../axios/axios";
import Utils from "../../utils/utls";
import { Id } from "../base/BaseEntity";
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

export const getUsersCollection = (cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted());
    try {
      const results = await axios.get<BaseResponse<User[]>>("/user/user");

      if(results.data.documents) {
          dispatch(getUsersCollectionFinished(results.data.documents))
      }

      dispatch(handleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleUserError());
    }
  };
}

const getUsersCollectionFinished = (data: User[]) => {
  return {
    type: CONS.GET_USERS_FINISHED,
    data,
  } as const
}

export const getUser = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted());
    try {
      const results = await axios.get<BaseResponse<User>>(`/user/user/${id}`);

      if(results.data.documents) {
          dispatch(getUserFinished(results.data.documents))
      }

      dispatch(handleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleUserError());
    }
  };
}

const getUserFinished = (data: User) => {
  return {
    type: CONS.GET_USER_FINSIHED,
    data,
  } as const
}

export const updateRole = (id: Id, roleId: Id,  payload: User, cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted());
    try {
      const payloadCopy = {
        ...payload,
        role: roleId
      }

      const results = await axios.put<BaseResponse<User[]>>(`/user/user/${id}`, payloadCopy);

      if(results.data.documents) {
          dispatch(updateUserFinished(results.data.documents))
      }

      dispatch(handleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleUserError());
    }
  };
}

const updateUserFinished = (data: User[]) => {
  return {
    type: CONS.UPDATE_USER_FINISHED,
    data,
  } as const
}

export const deleteUser = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch(handleStarted());
    try {
      const results = await axios.delete<BaseResponse<User[]>>(`/user/user/${id}`);

      if(results.data.documents) {
          dispatch(deleteUserFinished(results.data.documents))
      }

      dispatch(handleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleUserError());
    }
  };
}

const deleteUserFinished = (data: User[]) => {
  return {
    type: CONS.DELETE_USER_FINISHED,
    data,
  } as const
}

export const logOut = () => {
  return {
    type: CONS.LOG_OUT,
  } as const
}


export type UserActions = ReturnType<typeof handleStarted | typeof handleFinished | typeof handleUserError | typeof loginUserFinished
| typeof addToken | typeof getPermissionsFinished | typeof getUsersCollectionFinished | typeof getUserFinished | typeof updateUserFinished | typeof deleteUserFinished | 
typeof logOut
>