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
        name="Клиент"
        listId={props.filterData.customerId}
        listElem={customerList}
        fieldValue="value"
        fieldId="_id"
      />
      <td className="specialTableHeaderTd">Сумма</td>
      <FilterTdList
        name="Сейф"
        listId={props.filterData.safe}
        listElem={[
          { id: 0, value: "нет" },
          { id: 1, value: "да" },
        ]}
        fieldValue="value"
        fieldId="id"
      />
      <FilterTdList
        name="Карта"
        listId={props.filterData.card}
        listElem={[
          { id: 0, value: "нет" },
          { id: 1, value: "да" },
        ]}
        fieldValue="value"
        fieldId="id"
      />
      <td className="specialTableHeaderTd">Счет</td>
      <FilterTdList
        name="Оплата заказа"
        listId={props.filterData.customerPayment}
        listElem={[
          { id: 0, value: "нет" },
          { id: 1, value: "да" },
        ]}
        fieldValue="value"
        fieldId="id"
      />
      <FilterTdList
        name="Оплата клиенту"
        listId={props.filterData.returnPayment}
        listElem={[
          { id: 0, value: "нет" },
          { id: 1, value: "да" },
        ]}
        fieldValue="value"
        fieldId="id"
      />
      <td className="specialTableHeaderTd">Дата</td>
    </tr>
  );
};
