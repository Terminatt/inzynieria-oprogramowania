import { Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";

export interface CategoryState {
  collection: Category[];
  selected: Category | null;
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface Category {
  _id: Id;
  name: string;
  description: string;
}

export interface CategoryPayload {
  name: string;
  description: string;
}