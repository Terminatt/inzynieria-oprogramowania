export interface ModalsState {
  isOpen: boolean;
  type: ModalType;
}

export enum ModalType {
  NONE = "NONE",
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  EDIT_CATEGORY = "EDIT_CATEGORY",
  ADD_CATEGORY = "ADD_CATEGORY",

}