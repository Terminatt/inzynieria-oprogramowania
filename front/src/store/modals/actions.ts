import { ModalType } from "./types"
import * as CONS from "./constants";

export const openModal = (modalType: ModalType) => {
  return {
    type: CONS.OPEN_MODAL,
    modalType
  } as const
}

export const closeModal = () => {
  return {
    type: CONS.CLOSE_MODAL,
  } as const
}



export type ModalActions = ReturnType<typeof openModal | typeof closeModal>