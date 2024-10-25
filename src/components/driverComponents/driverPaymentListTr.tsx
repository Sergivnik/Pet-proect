import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DriverPayment } from "./driverPaymentsList";
import { Driver } from "../editData/driverAccountTr";
import { findValueBy_Id } from "../myLib/myLib.js";
import "./driverForms.sass";

export const DriverPaymentListTr = (props: any) => {
  const [showOrderList, setShowOrderList] = useState<boolean>(false);
  const [showDebtList, setShowDebtList] = useState<boolean>(false);
  let payment = props.payment;

  const driverList: Driver[] = useSelector(
    (state: any) => state.oderReducer.driverlist
  );

  const handleClickTr = (payment: DriverPayment) => {
    console.log(payment);
    if (payment.listOfOders.length > 0) setShowOrderList(!showOrderList);
    if (payment.listOfDebts.length > 0) setShowDebtList(!showDebtList);
  };
  return (
    <React.Fragment>
      <tr
        onClick={() => handleClickTr(payment)}
      >
        <td className="driverPaymentTd">
          {new Date(payment.date).toLocaleDateString()}
        </td>
        <td className="driverPaymentTd">
          {findValueBy_Id(payment.idDriver, driverList).value}
        </td>
        <td className="driverPaymentTd">{payment.sumOfPayment}</td>
        <td className="driverPaymentTd">{payment.sumOfDebts}</td>
      </tr>
      {showOrderList && (
        <tr>
          <td colSpan={4}>
            <table className="driverOrdersLitTable">
              <thead className="driverPaymentsListMainTableThead">
                <tr>
                  <td>Дата</td>
                  <td>Водитель</td>
                  <td>Погрузка</td>
                  <td>Выгрузка</td>
                  <td>Цена</td>
                  <td>Номер счета</td>
                </tr>
              </thead>
            </table>
          </td>
        </tr>
      )}
      {showDebtList && (
        <tr>
          <td colSpan={4}>
            <table className="driverDebtsListTable">
              <thead className="driverPaymentsListMainTableThead">
                <tr>
                  <td>Дата</td>
                  <td>Категория</td>
                  <td>Суммк</td>
                  <td>Примечание</td>
                </tr>
              </thead>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
