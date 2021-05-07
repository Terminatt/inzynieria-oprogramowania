import { Dispatch } from "react";
import axios from "../../axios/axios";
import { Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import BaseResponse from "../base/BaseResponse";
import * as CONS from "./constants";
import { Category, CategoryPayload } from "./types";

// handle loading
const handleCategoryStarted = () => {
  return {
    type: CONS.HANDLE_CATEGORY_STARTED,
  } as const
}

const handleCategoryFinished = () => {
  return {
    type: CONS.HANDLE_CATEGORY_FINISHED,
  } as const
}

export const handleCategoryError = (error?: ErrorResponse | null) => {
  return {
    type: CONS.HANDLE_CATEGORY_ERROR,
    error,
  } as const
}

export const getCategoryCollection = (cb?: () => void) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    dispatch(handleCategoryStarted());
    try {
      const results = await axios.get<BaseResponse<Category[]>>("/ebook/category");

      if(results.data.document) {
          dispatch(getCategoryCollectionFinished(results.data.document))
      }

      dispatch(handleCategoryFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleCategoryError());
    }
  };
}

export const getCategoryCollectionFinished = (data: Category[]) => {
  return {
    type: CONS.GET_CATEGORIES,
    data,
  } as const
}

export const getCategory= (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    dispatch(handleCategoryStarted());
    try {
      const results = await axios.get<BaseResponse<Category>>(`/ebook/category/${id}`);
      if(results.data.document) {
        dispatch(getCategoryFinished(results.data.document))

      }
      dispatch(handleCategoryFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleCategoryError());
    }
  };
}

export const getCategoryFinished = (data: Category) => {
  return {
    type: CONS.GET_CATEGORY,
    data,
  } as const
}

export const addCategory = (payload: CategoryPayload, cb?: () => void) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    dispatch(handleCategoryStarted());
    try {
      const results = await axios.post<BaseResponse<Category>>("/ebook/category", payload);
      if(results.data.document) {
        dispatch(addCategoryFinished(results.data.document));

      }
      dispatch(handleCategoryFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleCategoryError());
    }
  };
}

export const addCategoryFinished = (data: Category) => {
  return {
    type: CONS.ADD_CATEGORY,
    data,
  } as const
}

export const editCategory = (id: Id, payload: CategoryPayload, cb?: () => void) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    dispatch(handleCategoryStarted());
    try {
      const results = await axios.put<BaseResponse<Category>>(`/ebook/category/${id}`, payload);
      if(results.data.document) {
        dispatch(editCategoryFinished(results.data.document));

      }
      dispatch(handleCategoryFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleCategoryError());
    }
  };
}

export const editCategoryFinished = (data: Category) => {
  return {
    type: CONS.EDIT_CATEGORY,
    data,
  } as const
}

export const deleteCategory = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<CategoryActions>) => {
    dispatch(handleCategoryStarted());
    try {
      await axios.delete<BaseResponse>(`/ebook/category/${id}`);
      dispatch(handleCategoryFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleCategoryError());
    }
  };
}


export type CategoryActions = ReturnType<typeof handleCategoryStarted | typeof handleCategoryFinished | typeof handleCategoryError |
  typeof getCategoryCollectionFinished | typeof getCategoryFinished | typeof addCategoryFinished | typeof editCategoryFinished
>;