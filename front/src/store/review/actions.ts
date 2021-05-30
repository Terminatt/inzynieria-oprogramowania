import { Dispatch } from 'react';
import axios from '../../axios/axios';
import { Id } from '../base/BaseEntity';
import { ErrorResponse } from '../base/BaseErrorResponse';
import BaseResponse from '../base/BaseResponse';
import * as CONS from './constants';
import { Review } from './types';

// handle loading
const handleReviewStarted = () => {
  return {
    type: CONS.HANDLE_REVIEW_STARTED,
  } as const
}

const handleReviewFinished = () => {
  return {
    type: CONS.HANDLE_REVIEW_FINISHED,
  } as const
}

export const handleReviewError = (error?: ErrorResponse | null) => {
  return {
    type: CONS.HANDLE_REVIEW_ERROR,
    error,
  } as const
}

export const getReviewCollection = (cb?: () => void) => {
  return async (dispatch: Dispatch<ReviewActions>) => {
    dispatch(handleReviewStarted());
    try {
      const results = await axios.get<BaseResponse<Review[]>>("/review");

      if(results.data.documents) {
          dispatch(getReviewCollectionFinished(results.data.documents))
      }

      dispatch(handleReviewFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleReviewError());
    }
  };
}

export const getReviewCollectionFinished = (data: Review[]) => {
  return {
    type: CONS.GET_REVIEWS,
    data,
  } as const
}

export const getReviewForEbookCollection = (ebookId: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<ReviewActions>) => {
    dispatch(handleReviewStarted());
    try {
      const results = await axios.get<BaseResponse<Review[]>>(`/ebook/review`, {params: {
        ebookId,
      }});

      if(results.data.documents) {
          dispatch(getReviewCollectionFinished(results.data.documents))
      }

      dispatch(handleReviewFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleReviewError());
    }
  };
}

export const getReview = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<ReviewActions>) => {
    dispatch(handleReviewStarted());
    try {
      const results = await axios.get<BaseResponse<Review>>(`/ebook/review/${id}`);

      if(results.data.document) {
          dispatch(getReviewFinished(results.data.document))
      }

      dispatch(handleReviewFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleReviewError());
    }
  };
}

export const getUserReview = (ebookId: Id, creator: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<ReviewActions>) => {
    dispatch(handleReviewStarted());
    try {
      const results = await axios.get<BaseResponse<Review[]>>(`/ebook/review`, {params: {
        ebookId,
        creator,
        limit: 1,
      }});

      if(results.data.documents) {
          dispatch(getReviewFinished(results.data.documents[0]))
      }

      dispatch(handleReviewFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleReviewError());
    }
  };
}

export const getReviewFinished = (data: Review) => {
  return {
    type: CONS.GET_REVIEW,
    data,
  } as const
}

export const createReview = (payload: Partial<Review>, cb?: () => void) => {
  return async (dispatch: Dispatch<ReviewActions>) => {
    dispatch(handleReviewStarted());
    try {
      await axios.post<BaseResponse<Review>>(`/ebook/review`, payload);

      dispatch(handleReviewFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleReviewError());
    }
  };
}

export const updateReview = (id: Id, payload: Partial<Review>, cb?: () => void) => {
  return async (dispatch: Dispatch<ReviewActions>) => {
    dispatch(handleReviewStarted());
    try {
      await axios.put<BaseResponse<Review>>(`/ebook/review/${id}`, payload);

      dispatch(handleReviewFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleReviewError());
    }
  };
}

export const deleteReview = (id: Id, cb?: () => void) => {
  return async (dispatch: Dispatch<ReviewActions>) => {
    dispatch(handleReviewStarted());
    try {
      await axios.delete<BaseResponse<Review>>(`/ebook/review/${id}`);

      dispatch(handleReviewFinished());
      if(cb) {
        cb();
      }
    }
    catch (e: any) {
      dispatch(handleReviewError());
    }
  };
}

export const selectReview = (data: Review) => {
  return {
    type: CONS.SELECT_REVIEW,
    data,
  } as const
}



export type ReviewActions = ReturnType<typeof handleReviewStarted | typeof handleReviewFinished | typeof handleReviewError
| typeof getReviewCollectionFinished | typeof getReviewFinished | typeof selectReview
>;