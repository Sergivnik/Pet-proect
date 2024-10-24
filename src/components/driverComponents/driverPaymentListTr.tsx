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
        key={`keyDriverPayment${payment.id}`}
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
        <table>
          <thead>
            <tr>
              <td>Заказы</td>
            </tr>
          </thead>
        </table>
      )}
      {showDebtList && (
        <table>
          <thead>
            <tr>
              <td>Долги</td>
            </tr>
          </thead>
        </table>
      )}
    </React.Fragment>
  );
};
