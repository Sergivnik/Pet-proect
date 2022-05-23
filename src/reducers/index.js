import { combineReducers } from "redux";
import { oderReducer } from "./oderReducer.js";
import { reportReducer } from "./reportReducer.js";

export default combineReducers({
  oderReducer,
  reportReducer,
});
