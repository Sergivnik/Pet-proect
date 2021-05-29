import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilterList } from "../filterList/filterList.jsx";
import { FilterDateList } from "../filterDate/filterDateList.jsx";
import { FilterPrice } from "../filterPrice/filterPrice.jsx";
import "./oders.sass";

export const UserThead = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [colNumber, setColNumber] = useState(null);

  const dateList = useSelector((state) => state.oderReducer.filteredDateList);
  const driversList = useSelector((state) => state.oderReducer.filteredDrivers);
  const clientList = useSelector((state) => state.oderReducer.filteredClients);
  const citiesLoading = useSelector(
    (state) => state.oderReducer.filteredLoading
  );
  const citiesUnloading = useSelector(
    (state) => state.oderReducer.filteredUnloading
  );
  const maxCustomerPrice = useSelector(
    (state) => state.oderReducer.maxCustomerPrice
  );
  const minCustomerPrice = useSelector(
    (state) => state.oderReducer.minCustomerPrice
  );
  const maxDriverPrice = useSelector(
    (state) => state.oderReducer.maxDriverPrice
  );
  const minDriverPrice = useSelector(
    (state) => state.oderReducer.minDriverPrice
  );
  const filteredCustomerPrice = useSelector(
    (state) => state.oderReducer.filteredCustomerPrice
  );
  const filteredDriverPrice = useSelector(
    (state) => state.oderReducer.filteredDriverPrice
  );

  const handleClickFilter = (e) => {
    setShowFilter(true);
    setColNumber(e.currentTarget.parentElement.cellIndex);
  };

  const closeFilter = () => setShowFilter(false);

  return (
    <thead>
      <tr className="odersTr">
        <td className="odersTd odersTRheader">
          <span>Дата</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="30" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={props.filterList.date.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 0 && (
            <FilterDateList
              name="Date"
              arrlist={dateList}
              filterList={props.filterList.date}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className="odersTd odersTRheader">
          <span>Водитель</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="30" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={props.filterList.driver.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 1 && (
            <FilterList
              name="Driver"
              arrlist={driversList}
              filterList={props.filterList.driver}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Заказчик
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="30" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={props.filterList.oder.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 2 && (
            <FilterList
              name="Customer"
              arrlist={clientList}
              filterList={props.filterList.oder}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Загрузка
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="30" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.cityLoading.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 3 && (
            <FilterList
              name="LoadingCity"
              arrlist={citiesLoading}
              filterList={props.filterList.cityLoading}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Выгрузка
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="30" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.cityUnloading.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 4 && (
            <FilterList
              name="UnloadingCity"
              arrlist={citiesUnloading}
              filterList={props.filterList.cityUnloading}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Цена клиента
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="30" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.customerPrice.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 5 && (
            <FilterPrice
              name="CustomerPrice"
              maxPrice={filteredCustomerPrice[1]}
              minPrice={filteredCustomerPrice[0]}
              filterList={props.filterList.customerPrice}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Цена водителя
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="30" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.driverPrice.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 6 && (
            <FilterPrice
              name="DriverPrice"
              maxPrice={filteredDriverPrice[1]}
              minPrice={filteredDriverPrice[0]}
              filterList={props.filterList.driverPrice}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className="odersTd odersTRheader">Доверенность</td>
        <td className="odersTd odersTRheader">Выполнен</td>
        <td className="odersTd odersTRheader">Док-ты</td>
        <td className="odersTd odersTRheader">Клиент Оплата</td>
        <td className="odersTd odersTRheader">Водитель Оплата</td>
        <td className="odersTd odersTRheader">
          <button className="odersTdBtn" onClick={props.handleClick}>
            Саздать
          </button>
        </td>
      </tr>
    </thead>
  );
};
