// redux
import { UserActions } from "./actions";
import { UserState } from "./types";
import * as CONS from "./constants";

const initialState: UserState = {
  isLoading: false,
  error: null,
  token: null,
}


export default function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case CONS.HANDLE_USER_STARTED:
      return {
        ...state,
        isLoading: true,
      }
    case CONS.HANDLE_USER_FINISHED:
      return {
        ...state,
        isLoading: false,
      }
    case CONS.HANDLE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case CONS.LOGIN_USER_FINISHED:
      return {
        ...state,
        user: action.data,
      }
    case CONS.ADD_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    default:
      return state
  }
}