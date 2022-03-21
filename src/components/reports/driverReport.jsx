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

  const [reportList, setReportList] = useState([]);
  const [idTrackDriverList, setIdTrackDriverList] = useState([]);

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
  const handleBlur = (e) => {
    if (e.currentTarget.value != "") {
      let date = new Date(e.currentTarget.value);
      if (e.currentTarget.name == "dateBegin") setDateBegin(date);
      if (e.currentTarget.name == "dateEnd") setDateEnd(date);
    }
  };
  const handleClick = () => {
    if (idDriver == null || dateBegin == null || dateEnd == null) {
      alert("Ввведены не все данные");
    } else {
      let arr = fullOrderList.filter((elem) => {
        let dateElem = new Date(elem.date);
        return (
          dateElem >= dateBegin &&
          dateElem <= dateEnd &&
          elem.idDriver == idDriver
        );
      });
      if (arr.length != 0) {
        let arrTrackDriver = [];
        let arr2 = [];
        arr.forEach((elem) => {
          if (!arrTrackDriver.includes(elem.idTrackDriver)) {
            arrTrackDriver.push(elem.idTrackDriver);
          }
        });
        arrTrackDriver.forEach((trackDriver, index) => {
          arr2[index] = arr.filter((elem) => elem.idTrackDriver == trackDriver);
        });
        setIdTrackDriverList(arrTrackDriver);
        setReportList(arr2);
      } else {
        alert("Нет данных в указанном периоде");
        setDateBegin(null);
        setDateEnd(null);
      }
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
            <input
              name="dateBegin"
              type="date"
              onKeyDown={handleEnter}
              onBlur={handleBlur}
            />
          </div>
        ) : (
          <p>{dateBegin.toLocaleDateString()}</p>
        )}
        <p> по</p>
        {dateEnd == null ? (
          <div className="divDriverChoise">
            <input
              name="dateEnd"
              type="date"
              onKeyDown={handleEnter}
              onBlur={handleBlur}
            />
          </div>
        ) : (
          <p>{dateEnd.toLocaleDateString()}</p>
        )}
        <button className="driverReportBtn" onClick={handleClick}>
          Отчет
        </button>
      </header>
      <main>
        {reportList.length != 0 &&
          reportList.map((arrTrackDriver, index) => {
            return (
              <div>
                {`Водитель ${idTrackDriverList[index]}`}
                {arrTrackDriver.map((elem) => {
                  return <p>{elem.date}</p>;
                })}
              </div>
            );
          })}
      </main>
    </div>
  );
};
