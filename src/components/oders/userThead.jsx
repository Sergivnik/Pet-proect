import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FilterList } from "../filterList/filterList.jsx";
import "./oders.sass";

export const UserThead = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [colNumber, setColNumber] = useState(null);

  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const handleClickFilter = (e) => {
    setShowFilter(true);
    setColNumber(e.target.parentElement.parentElement.cellIndex);
  };
  return (
    <thead>
      <tr className="odersTr">
        <td className="odersTd odersTRheader">Дата</td>
        <td className="odersTd odersTRheader">
          <span>Водитель</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <img
              height="20"
              weight="20"
              src="http://localhost:3000/img/down-arrow.png"
              alt=""
            />
          </button>
          {showFilter && colNumber === 1 && (
            <FilterList name="Driver" arrlist={driversList} />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Заказчик
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <img
              height="20"
              weight="20"
              src="http://localhost:3000/img/down-arrow.png"
              alt=""
            />
          </button>
          {showFilter && colNumber === 2 && (
            <FilterList name="Driver" arrlist={clientList} />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Загрузка
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <img
              height="20"
              weight="20"
              src="http://localhost:3000/img/down-arrow.png"
              alt=""
            />
          </button>
          {showFilter && colNumber === 3 && (
            <FilterList name="Driver" arrlist={citieslist} />
          )}
        </td>
        <td className="odersTd odersTRheader">
          Выгрузка
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <img
              height="20"
              weight="20"
              src="http://localhost:3000/img/down-arrow.png"
              alt=""
            />
          </button>
          {showFilter && colNumber === 4 && (
            <FilterList name="Driver" arrlist={citieslist} />
          )}
        </td>
        <td className="odersTd odersTRheader">Цена клиента</td>
        <td className="odersTd odersTRheader">Цена водителя</td>
        <td className="odersTd odersTRheader">Доверенность</td>
        <td className="odersTd odersTRheader">Выполнен</td>
        <td className="odersTd odersTRheader">
          <button className="odersTdBtn" onClick={props.handleClick}>
            Саздать
          </button>
        </td>
      </tr>
    </thead>
  );
};
