import { apiMiddleware } from "redux-api-middleware";
import oderMiddleware from "./oderMiddleware.js";
import { socketMiddleware } from "./socketMiddleware.js";

export default [apiMiddleware, oderMiddleware, socketMiddleware];
