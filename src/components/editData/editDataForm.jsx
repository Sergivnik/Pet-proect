import React, { useEffect, useState } from "react";
import { DriverTable } from "./driverTable.jsx";
import "./editData.sass";

export const EditDataForm = (props) => {
  const [editTable, setEditTable] = useState(null);
  const handleClickBtnMenu = (e) => {
    let btnName = e.currentTarget.name;
    switch (btnName) {
      case "drivers":
        setEditTable(<DriverTable />);
        break;
      case "trackdrivers":
        setEditTable(<DriverTable />);
        break;
      case "tracklist":
        setEditTable(<DriverTable />);
        break;
      case "cities":
        setEditTable(<DriverTable />);
        break;
      case "oders":
        setEditTable(<DriverTable />);
        break;
      case "clientmanager":
        setEditTable(<DriverTable />);
        break;
    }
  };
  return (
    <div className="EDFmainForm">
      <div className="EDFMenuDiv">
        <button
          name="drivers"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Перевозчики
        </button>
        <button
          name="trackdrivers"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Водители
        </button>
        <button
          name="tracklist"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Автомобиль
        </button>
        <button
          name="cities"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Город
        </button>
        <button
          name="oders"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Заказчик
        </button>
        <button
          name="clientmanager"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Менеджер
        </button>
      </div>
      <div>{editTable}</div>
    </div>
  );
};
