import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilterTdList } from "../myLib/filterTd/filterTdList.jsx";
import "./specialTable.sass";

export const SpecialTableHeaderTr = (props) => {
  const customerList = useSelector((state) => state.oderReducer.clientList);
  return (
    <tr>
      <FilterTdList
        name="customerId"
        title="Клиент"
        listId={props.filterData.customerId}
        getFilteredList={props.getFilteredList}
      />
      <td className="specialTableHeaderTd">Сумма</td>
      <FilterTdList
        name="safe"
        title="Сейф"
        listId={props.filterData.safe}
        getFilteredList={props.getFilteredList}
      />
      <FilterTdList
        name="card"
        title="Карта"
        listId={props.filterData.card}
        getFilteredList={props.getFilteredList}
      />
      <td className="specialTableHeaderTd">Счет</td>
      <FilterTdList
        name="customerPayment"
        title="Оплата заказа"
        listId={props.filterData.customerPayment}
        getFilteredList={props.getFilteredList}
      />
      <FilterTdList
        name="returnPayment"
        title="Оплата клиенту"
        listId={props.filterData.returnPayment}
        getFilteredList={props.getFilteredList}
      />
      <td className="specialTableHeaderTd">Дата</td>
    </tr>
  );
};
