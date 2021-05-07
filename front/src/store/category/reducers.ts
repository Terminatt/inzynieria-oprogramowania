// redux
import { CategoryActions } from "./actions";
import * as CONS from "./constants";
import { CategoryState } from "./types";

const initialState: CategoryState = {
  collection: [],
  selected: null,
  isLoading: false,
  error: null,
}


export default function categoryReducer(state = initialState, action: CategoryActions): CategoryState {
  switch (action.type) {
    case CONS.HANDLE_CATEGORY_STARTED:
      return {
        ...state,
        isLoading: true,
      }
    case CONS.HANDLE_CATEGORY_FINISHED:
      return {
        ...state,
        isLoading: false,
      }
    case CONS.HANDLE_CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case CONS.GET_CATEGORIES: 
      return {
        ...state,
        collection: action.data,
      }
    case CONS.GET_CATEGORY:
    case CONS.EDIT_CATEGORY:
    case CONS.ADD_CATEGORY:
    case CONS.SELECT_CATEGORY:
      return {
        ...state,
        selected: action.data,
      }
    default:
      return state
  }
}