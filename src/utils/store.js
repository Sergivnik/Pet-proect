import { createStore, applyMiddleware, compose } from "redux";
import initReducers from "../reducers";
import thunk from "redux-thunk";

export const initStore = () => {
  const innitialStore = {};

  return createStore(initReducers, innitialStore, applyMiddleware(thunk));
};
