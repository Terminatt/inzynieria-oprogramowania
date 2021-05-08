import { Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import { Category } from "../category/types";

export interface EbooksState {
  collection: Ebook[];
  selected: Ebook | null;
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface Ebook {
  _id: Id;

  title: string;
  author: string;
  publisher: string;
  releaseDate: string;
  numberOfPages: number;
  coverImage?: string;
  file?: string;
  categories: Pick<Category, "_id" | "name">[];

}

export type EbookPayloadKeys = "title" | "author" | "publisher" | "releaseDate" | "numberOfPages";

export interface EbookPayload extends Pick<Ebook, EbookPayloadKeys> {
  coverImage?: File;
  file: File;

  categories: Id[];
}

