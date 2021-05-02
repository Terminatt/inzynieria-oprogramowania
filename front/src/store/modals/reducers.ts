// redux
import { ModalActions } from "./actions";
import * as CONS from "./constants";
import { ModalsState, ModalType } from "./types";

const initialState: ModalsState = {
  isOpen: false,
  type: ModalType.NONE,
}


export default function modalsReducer(state = initialState, action: ModalActions): ModalsState {
  switch (action.type) {
    case CONS.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        type: action.modalType,
      };
    case CONS.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        type: ModalType.NONE,
      }
    default:
      return state
  }
}