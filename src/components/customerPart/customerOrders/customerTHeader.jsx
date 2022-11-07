import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilterDateListTd } from "../../myLib/filterTd/filterDateListTd.jsx";
import { FilterTdList } from "../../myLib/filterTd/filterTdList.jsx";
import "./customerOrders.sass";

export const CustomerTheader = (props) => {
  console.log(props);
  let data = props.data;

  const [filterData, setFilterData] = useState({
    date: [],
    managerList: [],
    driverList: [],
    loadingList: [],
    unLoadingList: [],
    priceList: [],
    documentList: [],
    paymentList: [],
    customerClientList: [],
  });

  useEffect(() => {
    let obj = { ...filterData };
    let uniqueArr = [];
    let index = 0;
    data.forEach((elem) => {
      if (!uniqueArr.includes(elem.date)) {
        uniqueArr.push(elem.date);
        let date = new Date(elem.date);
        let dateStr = `${date.getFullYear()}-${
          date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
        obj.date.push({ id: index, value: dateStr, checked: true });
        index++;
      }
    });
    setFilterData(obj);
    console.log(obj);
  }, [props]);
  const getFilteredList = () => {};

  return (
    <thead className="customerOrderThead">
      <tr>
        <FilterDateListTd
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
