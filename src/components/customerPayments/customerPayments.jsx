import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./customerPayments.sass";
import { getPaymentsData } from "../../middlewares/initialState";

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
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Заказчик</td>
            <td>Сумма платежа</td>
            <td>Сумма распределенная по заказам</td>
            <td>Сумма переплаты</td>
          </tr>
        </thead>
        <tbody>
          {customerPaymentsList.map((elem) => {
            let sumOfOders = elem.listOfOders.reduce(
              (sum, current) => sum + current.customerPrice,
              0
            );
            let nameOfCustomer = clientList.find(
              (item) => item._id == elem.idCustomer
            ).value;
            return (
              <tr key={elem.id}>
                <td>{elem.id}</td>
                <td>{nameOfCustomer}</td>
                <td>{elem.sumOfPayment}</td>
                <td>{sumOfOders}</td>
                <td>{elem.sumExtraPayment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
