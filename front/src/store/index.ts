// core
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// reducers
import userReducer from './user/reducers';
import modalsReducer from "./modals/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  modals: modalsReducer,
})


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export type AppState = ReturnType<typeof store.getState>;

export default store