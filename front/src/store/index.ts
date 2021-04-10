// core
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// reducers
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  user: userReducer
})


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export type AppState = ReturnType<typeof store.getState>;

export default store