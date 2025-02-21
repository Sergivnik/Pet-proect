import { createStore, applyMiddleware, compose } from "redux";
import initReducers from "../reducers";
import thunk from "redux-thunk";
import middlewares from "../middlewares";
import { socketMiddleware } from "../middlewares/socketMiddleware";

export const initStore = () => {
  const innitialStore = {};

  return createStore(
    initReducers,
    innitialStore,
    compose(
      applyMiddleware(...middlewares, socketMiddleware, thunk)
      // window.__REDUX_DEVTOOLS_EXTENSION__
      //   ? window.__REDUX_DEVTOOLS_EXTENSION__()
      //   : () => {}
    )
  );
};
