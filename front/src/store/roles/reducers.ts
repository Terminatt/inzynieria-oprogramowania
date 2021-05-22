// redux
import { RolesActions } from "./actions";
import * as CONS from "./constants";
import { RoleState } from "./types";

const initialState: RoleState = {
  collection: [],
  selected: null,
  isLoading: false,
  error: null,
}


export default function rolesReducer(state = initialState, action: RolesActions): RoleState{
  switch (action.type) {
    case CONS.HANDLE_ROLE_STARTED:
      return {
        ...state,
        isLoading: true,
      }
    case CONS.HANDLE_ROLE_FINISHED:
      return {
        ...state,
        isLoading: false,
      }
    case CONS.HANDLE_ROLE_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.error,
        }
    case CONS.GET_ROLE_FINISHED:
        return {
          ...state,
          selected: action.data,
        }
    case CONS.GET_ROLES_FINISHED:
    case CONS.CREATE_ROLE_FINISHED:
    case CONS.UPDATE_ROLE_FINISHED:
    case CONS.DELETE_ROLE_FINISHED:
      return {
        ...state,
        collection: action.data,
      }
    default:
      return state
  }
}