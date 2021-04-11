import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FilterList } from "../filterList/filterList.jsx";

export const UserThead = (props) => {
  const [showFilter, setShowFilter] = useState(false);

  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const handleClickFilter = () => {
    setShowFilter(true);
  };
  return (
    <thead>
      <tr className="odersTr">
        <td className="odersTd odersTRheader">Дата</td>
        <td className="odersTd odersTRheader">
          Водитель
          <button onClick={handleClickFilter}>+</button>
          {showFilter && <FilterList name="Driver" arrlist={driversList} />}
        </td>
        <td className="odersTd odersTRheader">Заказчик</td>
        <td className="odersTd odersTRheader">Загрузка</td>
        <td className="odersTd odersTRheader">Выгрузка</td>
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
