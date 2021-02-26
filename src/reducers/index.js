import { combineReducers } from "redux";
import { oderReducer } from "./oderReducer.js";
import { addOderReducer } from "./addOderReducer.js";

export default combineReducers({
  oderReducer,
  addOderReducer,
});
