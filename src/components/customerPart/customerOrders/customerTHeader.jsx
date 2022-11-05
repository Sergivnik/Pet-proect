import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterTdList } from "../../myLib/filterTd/filterTdList.jsx";
import "./customerOrders.sass";

export const CustomerTheader = (props) => {
  const [filterData, setFilterData] = useState({
    date: [{ id: 1, value: "2022-10-10" }],
    managerList: [],
    driverList: [],
    loadingList: [],
    unLoadingList: [],
    priceList: [],
    documentList: [],
    paymentList: [],
    customerClientList: [],
  });

  const getFilteredList = () => {};

  return (
    <thead className="customerOrderThead">
      <tr>
        <FilterTdList
          name="dateId"
          title="Дата"
          listId={filterData.date}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="managerList"
          title="Менеджер"
          listId={filterData.managerList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="driverList"
          title="Водитель"
          listId={filterData.driverList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="loadingList"
          title="Погрузка"
          listId={filterData.loadingList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="loadingList"
          title="Выгрузка"
          listId={filterData.unLoadingList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="priceList"
          title="Цена"
          listId={filterData.priceList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="documentList"
          title="Док-ты"
          listId={filterData.documentList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="paymentList"
          title="Оплата"
          listId={filterData.paymentList}
          getFilteredList={getFilteredList}
        />
        <FilterTdList
          name="paymentList"
          title="Заказчик"
          listId={filterData.customerClientList}
          getFilteredList={getFilteredList}
        />
      </tr>
    </thead>
  );
};
