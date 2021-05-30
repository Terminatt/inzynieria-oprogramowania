// redux

import { ReviewActions } from "./actions";
import * as CONS from "./constants";
import { ReviewState } from "./types";


const initialState: ReviewState= {
  collection: [],
  selected: null,
  isLoading: false,
  error: null,
}


export default function reviewReducer(state = initialState, action: ReviewActions): ReviewState {
  switch (action.type) {
    case CONS.HANDLE_REVIEW_STARTED:
      return {
        ...state,
        isLoading: true,
      }
    case CONS.HANDLE_REVIEW_FINISHED:
      return {
        ...state,
        isLoading: false,
      }
    case CONS.HANDLE_REVIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case CONS.GET_REVIEWS:
      return {
        ...state,
        collection: action.data
      }
    case CONS.GET_REVIEW:
    case CONS.SELECT_REVIEW:
      return {
        ...state,
        selected: action.data
      }
    default:
      return state
  }
}