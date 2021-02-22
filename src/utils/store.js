import { createStore } from "redux";
import initReducers from "../reducers";

export const initStore=()=> {
  const innitialStore = {};

  return createStore(initReducers, innitialStore);
}
