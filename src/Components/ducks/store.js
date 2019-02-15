import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import promiseMiddleWare from "redux-promise-middleware";

const reducers = combineReducers({
  reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = composeEnhancers(applyMiddleware(promiseMiddleWare));
const store = createStore(reducers, middlewares);
export default store;
