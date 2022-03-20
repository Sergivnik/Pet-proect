import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./reports.sass";

export const DriverReport = () => {
  const fullOrderList = useSelector((state) => state.oderReducer.odersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);

  const [showDriver, setShowDriver] = useState(true);
  const [dateBegin, setDateBegin] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [idDriver, setIdDriver] = useState(null);

  const getValue = (id, arrObj) => {
    if (id) {
      let value = arrObj.find((elem) => elem._id == id);
      return value.value;
    }
  };
  const setValue = (data) => {
    console.log("driver", data._id);
    setShowDriver(false);
    setIdDriver(data._id);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      console.log(e.currentTarget.name);
      let date = new Date(e.currentTarget.value);
      if (e.currentTarget.name == "dateBegin") setDateBegin(date);
      if (e.currentTarget.name == "dateEnd") setDateEnd(date);
    }
  };

  return (
    <div className="driverReportMainDiv">
      <header className="driverReportHeader">
        <p>Перевозчик</p>
        {showDriver ? (
          <div className="divDriverChoise">
            <ChoiseList
              name="driver"
              arrlist={driversList}
              setValue={setValue}
            />
          </div>
        ) : (
          <p>{getValue(idDriver, driversList)}</p>
        )}
        <p>Дата с </p>
        {dateBegin == null ? (
          <div className="divDriverChoise">
            <input name="dateBegin" type="date" onKeyDown={handleEnter} />
          </div>
        ) : (
          <p>{dateBegin.toLocaleDateString()}</p>
        )}
        <p> по</p>
        {dateEnd == null ? (
          <div className="divDriverChoise">
            <input name="dateEnd" type="date" onKeyDown={handleEnter} />
          </div>
        ) : (
          <p>{dateEnd.toLocaleDateString()}</p>
        )}
      </header>
    </div>
  );
};
