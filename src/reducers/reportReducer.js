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
      const getSumOfOrdersAfterDateEnd = (arr, dateEnd) => {
        let sum = 0;
        arr.forEach((elem) => {
          let date = new Date(elem.date);
          if (date > dateEnd) {
            if (action.data.name == "customer")
              sum = sum + Number(elem.customerPrice);
            if (action.data.name == "driver")
              sum = sum + Number(elem.driverPrice);
          }
        });
        return sum;
      };
      const getSumOfPaymentAfterDateEnd = (arr, dateEnd) => {
        let sum = 0;
        arr.forEach((elem) => {
          let date = new Date(elem.date);
          if (date > dateEnd) sum = sum + Number(elem.sumOfPayment);
        });
        return sum;
      };
      const fillOrderFromBeginToEndAndGetSumOrder = (arr, dateEnd) => {
        let sum = 0;
        orderSum.push({
          id: 0,
          date: action.data.dateBegin,
          textInfo: `Начальный долг`,
          sum:
            Number(action.dataServer.clearDebt[0].debt) -
            Number(action.dataServer.partDebt[0].debt) +
            Number(sumPaymentAfterDateEnd) -
            Number(sumOrderAfterDateEnd),
          type: "outCome",
        });
        arr.forEach((elem) => {
          let date = new Date(elem.date);
          if (dateEnd >= date) {
            if (action.data.name == "customer")
              sum = sum + Number(elem.customerPrice);
            if (action.data.name == "driver")
              sum = sum + Number(elem.driverPrice);
            orderSum.push({
              id: i++,
              date: elem.date,
              textInfo: `Акт № ${elem.accountNumber}`,
              sum:
                action.data.name == "customer"
                  ? elem.customerPrice
                  : elem.driverPrice,
              type: "outCome",
            });
          }
        });
        return sum;
      };
      const fillPaymentFromBeginToEndAndGetSumPayment = (arr, dateEnd) => {
        let sum = 0;
        arr.forEach((elem) => {
          let date = new Date(elem.date);
          if (dateEnd >= date) {
            sum = sum + Number(elem.sumOfPayment);
            orderSum.push({
              id: i++,
              date: elem.date,
              textInfo: `Платеж от ${dateLocal(elem.date)}`,
              sum: elem.sumOfPayment,
              sumOfDebts: elem.sumOfDebts,
              type: "inCome",
            });
          }
        });
        return sum;
      };

      let i = 1;
      let sumOrderAfterDateEnd = 0;
      let sumOrder = 0;
      let sumPaymentAfterDateEnd = 0;
      let sumPayment = 0;
      let dateEnd = new Date(action.data.dateEnd);
      sumOrderAfterDateEnd = getSumOfOrdersAfterDateEnd(
        action.dataServer.orders,
        dateEnd
      );
      sumPaymentAfterDateEnd = getSumOfPaymentAfterDateEnd(
        action.dataServer.payments,
        dateEnd
      );
      sumOrder = fillOrderFromBeginToEndAndGetSumOrder(
        action.dataServer.orders,
        dateEnd
      );
      sumPayment = fillPaymentFromBeginToEndAndGetSumPayment(
        action.dataServer.payments,
        dateEnd
      );

      orderSum.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        if (a.date == b.date) return 0;
      });
      orderSum.push({
        id: i++,
        date: action.data.dateEnd,
        textInfo: `Долг на ${dateLocal(action.data.dateEnd)}`,
        sum: orderSum[0].sum,
        type: "outCome",
      });
      orderSum[0].sum = orderSum[0].sum - sumOrder + sumPayment;
      console.log(orderSum);
      return { ...store, reconciliation: orderSum };
    }
    default:
      return store;
  }
};
