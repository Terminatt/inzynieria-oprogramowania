// core
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({

})

export type AppState = typeof rootReducer;

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store