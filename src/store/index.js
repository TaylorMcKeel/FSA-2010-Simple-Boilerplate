import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger } from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension'
import { favesReducer } from './faves'
import { currReducer } from './curr'

// the reducer
const reducer = combineReducers({
    faves: favesReducer,
    curr: currReducer,
})
const middleware = composeWithDevTools(
    applyMiddleware(thunk, createLogger({collapsed: true}))
  )
const store = createStore(reducer, middleware);

export default store;
export * from './faves'
export * from './curr'