import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { findValueById, dateLocal } from "../myLib/myLib.js";

import "./editData.sass";
export const TrackDriverTable = (props) => {
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const trackdrivers = useSelector((state) => state.oderReducer.trackdrivers);
  const tracklist = useSelector((state) => state.oderReducer.tracklist);

  const [driversList, setDriversList] = useState(driversListFull);
  const [check, setCheck] = useState(true);

  const setValue = (data) => {
    console.log(data);
  };
  const handleChangeBox = (e) => {
    console.log(e);
  };
  const handleClickAdd = () => {};

  return (
    <div>
      <h2 className="driverH2">Таблица водителей</h2>
      <div className="driverFilter">
        <span>Перевозчик</span>
        <div className="driverChoise">
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
          {driversList.map((elem) => {
            return (
              <tr></tr>       
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
