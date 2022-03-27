import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DriverTable } from "./driverTable.jsx";
import { PointsTable } from "./pointsTable.jsx";
import { TrackDriverTable } from "./trackDriverTable.jsx";
import { TrackTable } from "./trackTable.jsx";
import { CustomerTable } from "./custonerTable.jsx";

import "./editData.sass";
import { CustomerManagerTable } from "./customerManagerTable.jsx";

export const EditDataForm = (props) => {
  const errMessage = useSelector((state) => state.oderReducer.message);

  const [editTable, setEditTable] = useState(null);
  const [showErrDiv, setShowErrDiv] = useState(false);

  const handleClickBtnMenu = (e) => {
    let btnName = e.currentTarget.name;
    switch (btnName) {
      case "drivers":
        setEditTable(<DriverTable />);
        break;
      case "trackdrivers":
        setEditTable(<TrackDriverTable />);
        break;
      case "tracklist":
        setEditTable(<TrackTable />);
        break;
      case "cities":
        setEditTable(<PointsTable />);
        break;
      case "oders":
        setEditTable(<CustomerTable />);
        break;
      // case "clientmanager":
      //   setEditTable(<CustomerManagerTable />);
      //   break;
    }
  };
  useEffect(() => {
    if (errMessage != null) {
      setShowErrDiv(true);
    } else {
      setShowErrDiv(false);
    }
  }, [errMessage]);
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
        {/* <button
          name="clientmanager"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Менеджер
        </button> */}
      </div>
      {/* {showErrDiv && <div>{errMessage.error}</div>} */}
      <div className="EDFTableDiv">{editTable}</div>
    </div>
  );
};
