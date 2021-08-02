import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./customerPayments.sass";
import { getPaymentsData } from "../../middlewares/initialState";
import { CustomerPaymentsTr } from "./customerPaymentsTr.jsx";

export const CustomerPayments = () => {
  const dispatch = useDispatch();
  const customerPaymentsList = useSelector(
    (state) => state.oderReducer.customerPaymentsList
  );
  const clientList = useSelector((state) => state.oderReducer.clientList);
  useEffect(() => {
    dispatch(getPaymentsData());
  }, [dispatch]);
  return (
    <div className="customerPaymentsMainDiv">
      <table className="customerPaymentMainTable">
        <thead>
          <tr>
            <td>Дата</td>
            <td>Заказчик</td>
            <td>Сумма платежа</td>
            <td>Сумма распределенная по заказам</td>
            <td>Сумма переплаты</td>
          </tr>
        </thead>
        <tbody>
          {customerPaymentsList.map((elem) => {
            return (
              <CustomerPaymentsTr
                key={elem.id}
                paymentData={elem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
