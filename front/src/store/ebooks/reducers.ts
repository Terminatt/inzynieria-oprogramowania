// redux
import { EbookActions} from "./actions";
import { EbooksState} from "./types";
import * as CONS from "./constants";

const initialState: EbooksState = {
  collection: [],
  selected: null,
  isLoading: false,
  error: null,
}


export default function ebookskReducer(state = initialState, action: EbookActions): EbooksState {
  switch (action.type) {
    case CONS.HANDLE_EBOOK_STARTED:
      return {
        ...state,
        isLoading: true,
      }
    case CONS.HANDLE_EBOOK_FINISHED:
      return {
        ...state,
        isLoading: false,
      }
    case CONS.HANDLE_EBOOK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case CONS.GET_EBOOKS:
      return {
        ...state,
        collection: action.data,
      }
    case CONS.GET_EBOOK:
    case CONS.ADD_EBOOK:
    case CONS.EDIT_EBOOK:
      return {
        ...state,
        selected: action.data,
      }
    default:
      return state
  }
}