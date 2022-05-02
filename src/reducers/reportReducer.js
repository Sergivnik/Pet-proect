import update from "react-addons-update";
import { reportDataStore } from "./reportsDataStore.js";
import { dateLocal } from "../components/myLib/myLib.js";
import {
  GET_REPORT_DATA_SUCCESS,
  GET_REPORT_DATA_FAILURE,
} from "../actions/reportActions.js";

export const reportReducer = (store = reportDataStore, action) => {
  switch (action.type) {
    case GET_REPORT_DATA_SUCCESS: {
      console.log(action);
      let orderSum = [];
      if (action.data.name == "customer") {
        let i = 1;
        let sumOrder = 0;
        action.dataServer.orders.forEach((elem) => {
          let dateEnd = new Date(action.data.dateEnd);
          let date = new Date(elem.date);
          if (date > dateEnd) sumOrder = sumOrder + Number(elem.customerPrice);
        });
        let sumPayment = 0;
        action.dataServer.payments.forEach((elem) => {
          let dateEnd = new Date(action.data.dateEnd);
          let date = new Date(elem.date);
          if (date > dateEnd)
            sumPayment = sumPayment + Number(elem.sumOfPayment);
        });
        orderSum.push({
          id: 0,
          date: action.data.dateBegin,
          textInfo: `Начальный долг`,
          sum:
            Number(action.dataServer.clearDebt[0].debt) -
            Number(action.dataServer.partDebt[0].debt) +
            Number(sumPayment) -
            Number(sumOrder),
          type: "inCome",
        });
        sumOrder = 0;
        action.dataServer.orders.forEach((elem) => {
          let dateEnd = new Date(action.data.dateEnd);
          let date = new Date(elem.date);
          if (dateEnd >= date) {
            sumOrder = sumOrder + Number(elem.customerPrice);
            orderSum.push({
              id: i++,
              date: elem.date,
              textInfo: `Акт № ${elem.accountNumber}`,
              sum: elem.customerPrice,
              type: "inCome",
            });
          }
        });
        sumPayment = 0;
        action.dataServer.payments.forEach((elem) => {
          let dateEnd = new Date(action.data.dateEnd);
          let date = new Date(elem.date);
          if (dateEnd >= date) {
            sumPayment = sumPayment + Number(elem.sumOfPayment);
            orderSum.push({
              id: i++,
              date: elem.date,
              textInfo: `Платеж от ${dateLocal(elem.date)}`,
              sum: elem.sumOfPayment,
              type: "outCome",
            });
          }
        });
        orderSum.sort((a, b) => {
          if (a.date > b.date) return 1;
          if (a.date < b.date) return -1;
          if (a.date == b.date) return 0;
        });
        orderSum.push({
          id: 0,
          date: action.data.dateEnd,
          textInfo: `Долг на ${dateLocal(action.data.dateEnd)}`,
          sum: orderSum[0].sum,
          type: "inCome",
        });
        orderSum[0].sum = orderSum[0].sum - sumOrder + sumPayment;
        console.log(orderSum);
      }
      return { ...store, reconciliation: orderSum };
    }
    default:
      return store;
  }
};
