import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import combineReducer from '../reducers/_index';

const middlewares = applyMiddleware(thunk);
const store = createStore(combineReducer, {}, middlewares);

// only dev
(window as any).store = store;

export default store;
