import { Dispatch } from "react";
import axios from "../../axios/axios";
import { Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import BaseResponse from "../base/BaseResponse";
import * as CONS from "./constants";
import { Ebook, EbookPayload, UserEbook } from "./types";

// handle loading
const handleEbookStarted = () => {
  return {
    type: CONS.HANDLE_EBOOK_STARTED,
  } as const
}

const handleEbookFinished = () => {
  return {
    type: CONS.HANDLE_EBOOK_FINISHED,
  } as const
}

export const handleEbookError = (error?: ErrorResponse | null) => {
  return {
    type: CONS.HANDLE_EBOOK_ERROR,
    error,
  } as const
}


export const getEbooksCollection = (cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      const results = await axios.get<BaseResponse<Ebook[]>>("/ebook/ebook");

      if(results.data.documents) {
          dispatch(getEbookCollectionFinished(results.data.documents))
      }

      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const getEbookCollectionFinished = (data: Ebook[]) => {
  return {
    type: CONS.GET_EBOOKS,
    data,
  } as const
}

export const getEbooksUsersCollection = (cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      const results = await axios.get<BaseResponse<UserEbook[]>>("user/library");

      if(results.data.documents) {
          dispatch(getEbookUserCollectionFinished(results.data.documents))
      }

      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const getEbookUserCollectionFinished = (data: UserEbook[]) => {
  return {
    type: CONS.GET_USER_EBOOKS,
    data,
  } as const
}


export const getEbook = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      const results = await axios.get<BaseResponse<Ebook>>(`/ebook/ebook/${id}`);

      if(results.data.documents) {
          dispatch(getEbookFinished(results.data.documents))
      }

      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const getEbookFinished = (data: Ebook) => {
  return {
    type: CONS.GET_EBOOK,
    data,
  } as const
}

export const getUserEbook = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      const results = await axios.get<BaseResponse<UserEbook>>(`/user/library/${id}`);

      if(results.data.documents) {
          dispatch(getUserEbookFinished(results.data.documents))
      }

      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}


export const getUserEbookFinished = (data: UserEbook) => {
  return {
    type: CONS.GET_USER_EBOOK,
    data,
  } as const
}


export const addEbook = (payload: EbookPayload, cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      const results = await axios.post<BaseResponse<Ebook>>("/ebook/ebook/", payload);

      if(results.data.documents) {
          dispatch(addEbookFinished(results.data.documents))
      }

      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const addEbookFinished = (data: Ebook) => {
  return {
    type: CONS.ADD_EBOOK,
    data,
  } as const
}

export const addUserEbook = (id: Id, ebook: Ebook, cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      const results = await axios.post<BaseResponse<UserEbook>>("/user/library", {ebookId: id, ebook,});

      if(results.data.documents) {
          dispatch(addUserEbookFinished(results.data.documents))
      }

      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const addUserEbookFinished = (data: UserEbook) => {
  return {
    type: CONS.ADD_USER_EBOOK,
    data,
  } as const
}

export const editEbook = (id: Id, payload: EbookPayload, cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      const results = await axios.put<BaseResponse<Ebook>>(`/ebook/ebook/${id}`, payload);

      if(results.data.documents) {
          dispatch(editEbookFinished(results.data.documents))
      }

      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const editEbookFinished = (data: Ebook) => {
  return {
    type: CONS.EDIT_EBOOK,
    data,
  } as const
}

export const deleteEbook = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      await axios.delete<BaseResponse<Ebook>>(`/ebook/ebook/${id}`);
      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const deleteUserEbook = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<EbookActions>) => {
    dispatch(handleEbookStarted());
    try {
      await axios.delete<BaseResponse<Ebook>>(`/user/library/${id}`);
      dispatch(handleEbookFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleEbookError());
    }
  };
}

export const selectEbook = (data: Ebook | null) => {
  return {
    type: CONS.SELECT_EBOOK,
    data,
  } as const
}

export const selectUserEbook = (data: Ebook | null) => {
  return {
    type: CONS.SELECT_USER_EBOOK,
    data,
  } as const
}

export type EbookActions = ReturnType<typeof handleEbookStarted | typeof handleEbookFinished | typeof handleEbookError | 
typeof getEbookCollectionFinished | typeof getEbookFinished | typeof addEbookFinished | typeof editEbookFinished | typeof selectEbook 
| typeof getEbookUserCollectionFinished | typeof getUserEbookFinished | typeof selectUserEbook | typeof addUserEbookFinished 
>;