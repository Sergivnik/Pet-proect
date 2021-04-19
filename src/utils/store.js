import { createStore, applyMiddleware, compose } from "redux";
import initReducers from "../reducers";
import thunk from "redux-thunk";
import middlewares from "../middlewares";

export const initStore = () => {
  const innitialStore = {};

  return createStore(
    initReducers,
    innitialStore,
    compose(
      applyMiddleware(...middlewares, thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__
      //   ? window.__REDUX_DEVTOOLS_EXTENSION__()
      //   : () => {}
    )
  );
};
