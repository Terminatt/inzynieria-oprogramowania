import { Dispatch } from "react";
import axios from "../../axios/axios";
import { Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import BaseResponse from "../base/BaseResponse";
import { Role } from "../user/types";
import * as CONS from './constants';
import { RolePayload } from "./types";

// handle loading
const handleRoleStarted = () => {
  return {
    type: CONS.HANDLE_ROLE_STARTED,
  } as const
}

const handleRoleFinished = () => {
  return {
    type: CONS.HANDLE_ROLE_FINISHED,
  } as const
}

export const handleRoleError = (error?: ErrorResponse | null) => {
  return {
    type: CONS.HANDLE_ROLE_ERROR,
    error,
  } as const
}

export const getRolesCollection = (cb?: () => void) => {
  return async (dispatch: Dispatch<RolesActions>) => {
    dispatch(handleRoleStarted());
    try {
      const results = await axios.get<BaseResponse<Role[]>>("/roles");

      if(results.data.documents) {
          dispatch(getRolesCollectionFinished(results.data.documents))
      }

      dispatch(handleRoleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleRoleError());
    }
  };
}

const getRolesCollectionFinished = (data: Role[]) => {
  return {
    type: CONS.GET_ROLES_FINISHED,
    data,
  } as const
}

export const getRole = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<RolesActions>) => {
    dispatch(handleRoleStarted());
    try {
      const results = await axios.get<BaseResponse<Role>>(`/roles/${id}`);

      if(results.data.documents) {
          dispatch(getRoleFinished(results.data.documents))
      }

      dispatch(handleRoleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleRoleError());
    }
  };
}

const getRoleFinished = (data: Role) => {
  return {
    type: CONS.GET_ROLE_FINISHED,
    data,
  } as const
}

export const createRole = (payload: RolePayload, cb?: () => void) => {
  return async (dispatch: Dispatch<RolesActions>) => {
    dispatch(handleRoleStarted());
    try {
      const results = await axios.post<BaseResponse<Role[]>>(`/roles`, payload);

      if(results.data.documents) {
          dispatch(createRoleFinished(results.data.documents))
      }

      dispatch(handleRoleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleRoleError());
    }
  };
}

const createRoleFinished = (data: Role[]) => {
  return {
    type: CONS.CREATE_ROLE_FINISHED,
    data,
  } as const
}

export const updateRole = (id: Id, payload: RolePayload, cb?: () => void) => {
  return async (dispatch: Dispatch<RolesActions>) => {
    dispatch(handleRoleStarted());
    try {
      const results = await axios.put<BaseResponse<Role[]>>(`/roles/${id}`, payload);

      if(results.data.documents) {
          dispatch(updateRoleFinished(results.data.documents))
      }

      dispatch(handleRoleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleRoleError());
    }
  };
}

const updateRoleFinished = (data: Role[]) => {
  return {
    type: CONS.UPDATE_ROLE_FINISHED,
    data,
  } as const
}

export const deleteRole = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<RolesActions>) => {
    dispatch(handleRoleStarted());
    try {
      const results = await axios.delete<BaseResponse<Role[]>>(`/roles/${id}`);

      if(results.data.documents) {
          dispatch(deleteRoleFinished(results.data.documents))
      }

      dispatch(handleRoleFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleRoleError());
    }
  };
}

const deleteRoleFinished = (data: Role[]) => {
  return {
    type: CONS.DELETE_ROLE_FINISHED,
    data,
  } as const
}


export type RolesActions = ReturnType<typeof handleRoleStarted | typeof handleRoleFinished | typeof handleRoleError |
typeof getRolesCollectionFinished | typeof getRoleFinished | typeof createRoleFinished | typeof updateRoleFinished | typeof deleteRoleFinished
>;