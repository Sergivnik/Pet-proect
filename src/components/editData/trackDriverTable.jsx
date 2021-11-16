import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";
import { TrackDriverTr } from "./trackDriverTr.jsx";
export const TrackDriverTable = (props) => {
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const trackdriversFull = useSelector(
    (state) => state.oderReducer.trackdrivers
  );

  const [driversList, setDriversList] = useState(driversListFull);
  const [trackdrivers, setTrackDrivers] = useState(trackdriversFull);
  const [check, setCheck] = useState(true);
  const [chosenId, setChosenId] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const setValue = (data) => {
    let arr = trackdriversFull.filter((elem) => elem.idOwner == data._id);
    setTrackDrivers(arr);
    setChosenId(data._id);
  };
  const handleChangeBox = (e) => {
    if (e.currentTarget.checked) {
      let [...arr] = driversListFull;
      setCheck(true);
      setDriversList(arr.filter((elem) => elem.active == 1));
    } else {
      setDriversList(driversListFull);
      setCheck(false);
    }
  };
  const handleClickAdd = () => {};
  const getCurrentId = (id) => {
    setCurrentId(id);
  };

  useEffect(() => {
    if (chosenId != null) {
      let arr = trackdriversFull.filter((elem) => elem.idOwner == chosenId);
      setDriversList(arr);
    } else {
      setDriversList(trackdriversFull);
    }
    if (check) {
      setDriversList(driversListFull.filter((elem) => elem.active == 1));
    } else {
      setDriversList(driversListFull);
    }
  }, [trackdriversFull]);
  return (
    <div>
      <h2 className="driverH2">Таблица водителей</h2>
      <div className="driverFilter">
        <span>Перевозчик</span>
        <div className="trackDriverChoise">
          <ChoiseList name="owner" arrlist={driversList} setValue={setValue} />
        </div>
        <span>Активный</span>
        <input type="checkbox" onChange={handleChangeBox} checked={check} />
        <button className="driverAddBtn" onClick={handleClickAdd}>
          Добавить
        </button>
      </div>
      <table className="trackDriverTbl">
        <thead>
          <tr>
            <td className="trackDriverTdHeader">Имя</td>
            <td className="trackDriverTdHeader">Полное имя</td>
            <td className="trackDriverTdHeader">Краткое имя</td>
            <td className="trackDriverTdHeader">Паспорт номер</td>
            <td className="trackDriverTdHeader">Выдан</td>
            <td className="trackDriverTdHeader">Дата</td>
            <td className="trackDriverTdHeader">ВУД</td>
            <td className="trackDriverTdHeader">Телефон</td>
            <td className="trackDriverTdHeader">Собственник</td>
            <td className="trackDriverTdHeader">Номер АМ</td>
          </tr>
        </thead>
        <tbody className="trackDriverTbody">
          {trackdrivers.map((elem) => {
            return (
              <TrackDriverTr
                key={"trackDriver" + elem._id}
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
