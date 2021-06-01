import { BaseEntity, Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";

export interface ReviewState {
  collection: Review[];
  selected: Review | null;
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface Review extends BaseEntity {
  ebookId: Id;
  stars: number;
  comment: string;
  creator: { name: string, _id: Id };
  
}