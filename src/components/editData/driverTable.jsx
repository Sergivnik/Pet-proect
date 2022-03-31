import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { DriverAddTr } from "./driverAddTr.jsx";
import { DriverTableTR } from "./driverTableTR.jsx";
import { TrackDriverTr } from "./trackDriverTr.jsx";
import { addData } from "../../actions/editDataAction.js";

import "./editData.sass";

export const DriverTable = (props) => {
  const dispatch = useDispatch();
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const trackdriversFull = useSelector(
    (state) => state.oderReducer.trackdrivers
  );

  const [driversList, setDriversList] = useState(driversListFull);
  const [driverListChoise, setDriverListChoise] = useState(driversListFull);
  const [trackdrivers, setTrackDrivers] = useState(null);
  const [check, setCheck] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [chosenId, setChosenId] = useState(null);
  const [showAddTr, setShowAddTr] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [reset, setReset] = useState(false);
  const [nameAddBtn, setNameAddBtn] = useState("Добавить водителя");
  const [activeMarker, setActiveMarker] = useState("driver");

  useEffect(() => {
    if (chosenId != null) {
      let arr = driversListFull.filter((elem) => elem._id == chosenId);
      setDriversList(arr);
    } else {
      setDriversList(driversListFull.filter((elem) => elem.active));
      setDriverListChoise(driversListFull.filter((elem) => elem.active));
    }
  }, [driversListFull]);
  useEffect(() => {
    setReset(false);
  }, [reset]);

  const handleChangeBox = (e) => {
    if (e.currentTarget.checked) {
      let [...arr] = driversListFull;
      setCheck(true);
      setDriversList(arr.filter((elem) => elem.active == 1));
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
    setChosenId(data._id);
    setShowInfo(true);
    setTrackDrivers(
      trackdriversFull.filter((elem) => elem.idOwner == data._id)
    );
  };
  const getCurrentId = (id) => {
    setCurrentId(id);
  };
  const handleClickAdd = () => {
    setShowAddTr(true);
  };
  const handleAddDriver = (data) => {
    dispatch(addData(data, "drivers"));
    setShowAddTr(false);
  };
  const handleClickReset = () => {
    setShowInfo(false);
    setReset(true);
    setChosenId(null);
    if (check) {
      setDriversList(driversListFull.filter((elem) => elem.active == 1));
    } else {
      setDriversList(driversListFull);
    }
  };
  const handleClickMarker = (e) => {
    let markerDiv = e.currentTarget;
    if (markerDiv.id == "driver") {
      setNameAddBtn("Добавить водителя");
      setActiveMarker("driver");
    }
    if (markerDiv.id == "track") {
      setNameAddBtn("Добавить автомобиль");
      setActiveMarker("track");
    }
  };
  const setMarkerStyle = (divId) => {
    if (divId == activeMarker) {
      return "divMarker divWithoutBottom";
    } else {
      return "divMarker";
    }
  };
  return (
    <>
      <h2 className="driverH2">Таблица перевозчиков</h2>
      <div className="driverFilter">
        <span>Перевозчик</span>
        <div className="driverChoise">
          <ChoiseList
            name="owner"
            arrlist={driverListChoise}
            setValue={setValue}
            reset={reset}
          />
        </div>
        <button className="driverAddBtn" onClick={handleClickReset}>
          Сброс
        </button>
        <span>Активный</span>
        <input type="checkbox" onChange={handleChangeBox} checked={check} />
        <button className="driverAddBtn" onClick={handleClickAdd}>
          Добавить
        </button>
      </div>
      <div className="tableDiv">
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
              <td className="driverTdHeader">Активный</td>
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
            {showAddTr && <DriverAddTr handleAddDriver={handleAddDriver} />}
          </tbody>
        </table>
        {showInfo && (
          <div>
            <header className="driverInfoHeader">
              <div className="driverInfoDivMarker">
                <div
                  id="driver"
                  className={setMarkerStyle("driver")}
                  onClick={handleClickMarker}
                >
                  Водитель
                </div>
                <div
                  id="track"
                  className={setMarkerStyle("track")}
                  onClick={handleClickMarker}
                >
                  Автомобиль
                </div>
              </div>
              <button className="driverAddBtn">{nameAddBtn}</button>
            </header>
            <div className="driverInfoContent">
              {activeMarker == "driver" && (
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
                      <td className="trackDriverTdHeader">Уволен</td>
                    </tr>
                  </thead>
                  <tbody className="trackDriverTbody">
                    {trackdrivers.map((elem) => {
                      return (
                        <TrackDriverTr
                          key={"trackDriver" + elem._id}
                          elem={elem}
                          // getCurrentId={getCurrentId}
                          // currentId={currentId}
                        />
                      );
                    })}
                    {/* {showAddTr && (
                      <TrackDraverAddTr
                        handleAddTrackDriver={handleAddTrackDriver}
                      />
                    )} */}
                  </tbody>
                </table>
              )}
              {activeMarker == "track" && (
                <table className="trackTbl">
                  <thead>
                    <tr>
                      <td className="trackTdHeader">Собственник</td>
                      <td className="trackTdHeader">Номер АМ</td>
                      <td className="trackTdHeader">Номер прицепа</td>
                      <td className="trackTdHeader">Марка АМ</td>
                    </tr>
                  </thead>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
