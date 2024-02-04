import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DriverTable } from "./driverTable.jsx";
import { PointsTable } from "./pointsTable.jsx";
import { TrackDriverTable } from "./trackDriverTable.jsx";
import { TrackTable } from "./trackTable.jsx";
import { CustomerTable } from "./customerTable.jsx";
import { ContractorsForm} from "./contractorsForm/contractorForm.tsx"

import "./editData.sass";

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
      case "contractors":
        setEditTable(<ContractorsForm/>);
        break;
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
          name="contractors"
          className="EDFMenuBtn"
          onClick={handleClickBtnMenu}
        >
          Контрагенты
        </button>
      </div>
      <div className="EDFTableDiv">{editTable}</div>
    </div>
  );
};
