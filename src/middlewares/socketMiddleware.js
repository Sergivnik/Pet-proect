import { io } from "socket.io-client";
import { addOderSuccess, delOderSuccess } from "../actions/oderActions";
import { DOMENNAME } from "./initialState";

const socket = io(DOMENNAME);

export const socketMiddleware = (store) => (next) => (action) => {
  // Подписываемся на событие только один раз
  if (!socket.hasListeners("orderAdded")) {
    socket.on("orderAdded", (data) => {
      console.log("Получен новый заказ через WebSocket:", data);
      store.dispatch(addOderSuccess(data.data, data.dataOrder));
    });
  }
  if (!socket.hasListeners("orderDelete")) {
    socket.on("orderDeleted", (data) => {
      console.log("Удален заказ через WebSocket:", data);
      store.dispatch(delOderSuccess(data));
    });
  }

  return next(action);
};
