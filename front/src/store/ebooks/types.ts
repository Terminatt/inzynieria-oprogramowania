import { Id } from "../base/BaseEntity";
import { ErrorResponse } from "../base/BaseErrorResponse";
import { Category } from "../category/types";

export interface EbooksState {
  collection: Ebook[];
  userCollection: UserEbook[];
  userSelected: Ebook | null;
  selected: Ebook | null;
  isLoading: boolean;
  error?: ErrorResponse | null;
}

export interface UserEbook {
  _id: Id,
  ebookId: Id,
  ebook: Ebook,
  file: string,
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
  nrOfRatings?: number;
  averageRating?: number | null;


}

export type EbookPayloadKeys = "title" | "author" | "publisher" | "releaseDate" | "numberOfPages";

export interface EbookPayload extends Pick<Ebook, EbookPayloadKeys> {
  coverImage?: File;
  file: File;

  categories: Id[];
}

