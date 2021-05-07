// core
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// reducers
import userReducer from './user/reducers';
import modalsReducer from "./modals/reducers";
import categoryReducer from './category/reducers';
import ebookskReducer from './ebooks/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  modals: modalsReducer,
  categories: categoryReducer,
  ebooks: ebookskReducer,
})


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export type AppState = ReturnType<typeof store.getState>;

export default store