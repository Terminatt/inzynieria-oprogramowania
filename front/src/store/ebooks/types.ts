import { Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";

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
  categories: Id[];

}

export type EbookPayloadKeys = "title" | "author" | "publisher" | "releaseDate" | "numberOfPages" | "categories";

export interface EbookPayload extends Record<EbookPayloadKeys, Ebook> {
  coverImage?: File;
  file: File;

}

