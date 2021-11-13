import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { DriverTableTR } from "./driverTableTR.jsx";

import "./editData.sass";

export const DriverTable = (props) => {
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);

  const [driversList, setDriversList] = useState(driversListFull);
  const [driverListChoise, setDriverListChoise] = useState(driversListFull);
  const [check, setCheck] = useState(true);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    setDriversList(driversListFull.filter((elem) => elem.active));
    setDriverListChoise(driversListFull.filter((elem) => elem.active));
  }, [driversListFull]);

  const handleChangeBox = (e) => {
    if (e.currentTarget.checked) {
      let [...arr] = driversListFull;
      setCheck(true);
      setDriversList(arr.filter((elem) => elem.active));
      setDriverListChoise(arr.filter((elem) => elem.active));
    } else {
      setDriversList(driversListFull);
      setDriverListChoise(driversListFull);
      setCheck(false);
    }
  };
  const setValue = (data) => {
    let arr = driversListFull.filter((elem) => elem._id == data._id);
    setDriversList(arr);
  };
  const getCurrentId = (id) => {
    setCurrentId(id);
  };
  return (
    <div>
      <h2 className="driverH2">Таблица перевозчиков</h2>
      <div className="driverFilter">
        <span>Перевозчик</span>
        <div className="driverChoise">
          <ChoiseList
            name="owner"
            arrlist={driverListChoise}
            setValue={setValue}
          />
        </div>
        <span>Активный</span>
        <input type="checkbox" onChange={handleChangeBox} checked={check} />
      </div>
      <table className="driverTbl">
        <thead>
          <tr>
            <td className="driverTdHeader">Краткое название</td>
            <td className="driverTdHeader">Телефон</td>
            <td className="driverTdHeader">Полное название</td>
            <td className="driverTdHeader">ИНН</td>
            <td className="driverTdHeader">Адрес</td>
            <td className="driverTdHeader">Расчетный счет</td>
            <td className="driverTdHeader">Договор</td>
          </tr>
        </thead>
        <tbody className="driverTbody">
          {driversList.map((elem) => {
            return (
              <DriverTableTR
                key={"driver" + elem._id}
                elem={elem}
                getCurrentId={getCurrentId}
                currentId={currentId}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
