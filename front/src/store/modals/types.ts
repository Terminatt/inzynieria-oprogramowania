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
  ADD_EBOOK = "ADD_EBOOK",
  EDIT_EBOOK = "EDIT_EBOOK",
  ADD_ROLE = "ADD_ROLE",
  EDIT_ROLE = "EDIT_ROLE",

}