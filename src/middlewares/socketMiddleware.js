import { io } from "socket.io-client";
import {
  addOderSuccess,
  delOderSuccess,
  editOrderFailure,
  editOrderSuccess,
  editOderNewSuccess,
  makePaymentCustomerSuccess,
  addOrderAppSuccess,
} from "../actions/oderActions";
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
  if (!socket.hasListeners("orderChanged")) {
    socket.on("orderChanged", (data) => {
      console.log("Изменен заказ через WebSocket:", data);
      if (data.data.error) {
        store.dispatch(editOrderFailure(data.data));
      } else {
        store.dispatch(
          editOrderSuccess(
            data.dataOrder.id,
            data.dataOrder.field,
            data.dataOrder.newValue
          )
        );
      }
    });
  }
  if (!socket.hasListeners("orderChangedNew")) {
    socket.on("orderChangedNew", (data) => {
      console.log("Изменен заказ через WebSocket New:", data);
      store.dispatch(editOderNewSuccess(data));
    });
  }
  if (!socket.hasListeners("madePaymentCustomer")) {
    socket.on("madePaymentCustomer", (data) => {
      console.log("Проведена оплата заказов через WebSocket New:", data);
      store.dispatch(
        makePaymentCustomerSuccess(
          data.data,
          data.dataIo.sumCustomerPayment,
          data.dataIo.extraPayments,
          data.dataIo.arr
        )
      );
    });
  }
  if (!socket.hasListeners("madeOrderFromApp")) {
    socket.on("madeOrderFromApp", (data) => {
      console.log("Создан заказ из заявки через WebSocket New:", data);
      store.dispatch(addOrderAppSuccess(data.data, data.dataIo, data.appId));
    });
  }

  return next(action);
};
