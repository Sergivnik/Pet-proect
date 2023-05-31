import { combineReducers } from "redux";
import { oderReducer } from "./oderReducer.js";
import { reportReducer } from "./reportReducer.js";
import { customerReducer } from "./customerOrderReduser.js";
import { tasksReducer } from "./tasksReducer.js";

export default combineReducers({
  oderReducer,
  reportReducer,
  customerReducer,
  tasksReducer,
});
