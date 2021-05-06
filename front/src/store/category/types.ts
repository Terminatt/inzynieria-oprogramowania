import { ErrorResponse } from "../base/BaseErrorResponse";

export interface CategoryState {
  collection: Category[];
  selected: Category | null;
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface Category {

}

export interface CategoryPayload {
  name: string;
  description: string;
}