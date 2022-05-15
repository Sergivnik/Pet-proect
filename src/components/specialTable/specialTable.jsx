import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";

export const SpecialTable = () => {
  const tableData = useSelector((state) => state.oderReducer.addtable);
  const customers = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.odersList);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Клиент</td>
            <td>Сумма</td>
            <td>Сейф</td>
            <td>Карта</td>
            <td>Счет</td>
            <td>Оплата заказа</td>
            <td>Оплата клиенту</td>
            <td>Дата</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((elem) => {
            return (
              <tr key={elem.id}>
                <td>{findValueBy_Id(elem.customerId, customers).value}</td>
                <td>{elem.sum}</td>
                <td>{elem.safe ? "нет" : "Ок"}</td>
                <td>{elem.card ? "нет" : "Ок"}</td>
                <td>{findValueBy_Id(elem.orderId, odersList).accountNumber}</td>
                <td>{elem.customerPayment ? "нет" : "Ок"}</td>
                <td>{elem.returnPayment ? "нет" : "Ок"}</td>
                <td>{elem.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
