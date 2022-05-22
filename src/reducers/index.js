import { combineReducers } from "redux";
import { oderReducer } from "./oderReducer.js";
import { reportReducer } from "./reportReducer.js";
import { addDataReducer } from "./addDataReducer.js";

export default combineReducers({
  oderReducer,
  reportReducer,
  addDataReducer,
});
