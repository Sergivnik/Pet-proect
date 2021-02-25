import { ADD_ODER } from "../actions/oderActions.js";

export const oderMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_ODER:
      console.log("This is middleware!!");
  }
  return next(action);
};
