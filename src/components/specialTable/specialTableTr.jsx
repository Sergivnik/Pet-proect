import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";
import "./specialTable.sass";

export const SpecialTableTr = (props) => {
  const elem = props.elem;
  const customers = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.odersList);
  return (
    <tr>
      <td className="specialTableBodyTd">
        {findValueBy_Id(elem.customerId, customers).value}
      </td>
      <td className="specialTableBodyTd">{elem.sum}</td>
      <td className="specialTableBodyTd">{elem.safe == 0 ? "нет" : "Ок"}</td>
      <td className="specialTableBodyTd">{elem.card == 0 ? "нет" : "Ок"}</td>
      <td className="specialTableBodyTd">
        {findValueBy_Id(elem.orderId, odersList).accountNumber}
      </td>
      <td className="specialTableBodyTd">
        {elem.customerPayment == 0 ? "нет" : "Ок"}
      </td>
      <td className="specialTableBodyTd">
        {elem.returnPayment == 0 ? "нет" : "Ок"}
      </td>
      <td className="specialTableBodyTd">{elem.date}</td>
    </tr>
  );
};
