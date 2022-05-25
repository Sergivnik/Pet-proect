import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilterTdList } from "../myLib/filterTd/filterTdList.jsx";
import "./specialTable.sass";

export const SpecialTableHeaderTr = (props) => {
  const customerList = useSelector((state) => state.oderReducer.clientList);
  console.log(props.filterData);
  return (
    <tr>
      <FilterTdList
        listId={props.filterData.customerId}
        listElem={customerList}
        fieldValue="value"
        fieldId="_id"
      />
      <td className="specialTableHeaderTd">Клиент</td>
      <td className="specialTableHeaderTd">Сумма</td>
      <td className="specialTableHeaderTd">Сейф</td>
      <td className="specialTableHeaderTd">Карта</td>
      <td className="specialTableHeaderTd">Счет</td>
      <td className="specialTableHeaderTd">Оплата заказа</td>
      <td className="specialTableHeaderTd">Оплата клиенту</td>
      <td className="specialTableHeaderTd">Дата</td>
    </tr>
  );
};
