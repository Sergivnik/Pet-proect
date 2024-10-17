import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataDriverPayments } from "../../actions/driverActions.js";
import "./driverForms.sass";
export const DriverPaymentsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDriverPayments());
    console.log("Hi");
  }, []);
  return (
    <div className="driverPaymentsListMainDiv">
      <table className="driverPaymentsLitMainTable">
        <thead className="driverPaymentsListMainTableThead">
          <tr>
            <td>Дата</td>
            <td>Перевозчик</td>
            <td>Сумма платежа</td>
            <td>Сумма списанная из долга</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lorem</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
