import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { DriverAddTr } from "./driverAddTr.jsx";
import { DriverTableTR } from "./driverTableTR.jsx";
import { TrackDriverTr } from "./trackDriverTr.jsx";
import { TrackDraverAddTr } from "./trackDriverAddTr.jsx";
import { TrackTr } from "./trackTr.jsx";
import { TrackAddTr } from "./trackAddTr.jsx";
import { addData } from "../../actions/editDataAction.js";
import { dateLocal } from "../myLib/myLib.js";
import "./editData.sass";

export const DriverTable = (props) => {
  const dispatch = useDispatch();
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const trackdriversFull = useSelector(
    (state) => state.oderReducer.trackdrivers
  );
  const tracklistFull = useSelector((state) => state.oderReducer.tracklist);

  const [driversList, setDriversList] = useState(driversListFull);
  const [driverListChoise, setDriverListChoise] = useState(driversListFull);
  const [trackList, setTrackList] = useState(tracklistFull);
  const [trackdrivers, setTrackDrivers] = useState(null);
  const [check, setCheck] = useState(true);
  const [currentId, setCurrentId] = useState(null);
  const [chosenId, setChosenId] = useState(null);
  const [showAddTr, setShowAddTr] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [reset, setReset] = useState(false);
  const [nameAddBtn, setNameAddBtn] = useState("Добавить водителя");
  const [activeMarker, setActiveMarker] = useState("driver");
  const [currentTrackDriverId, setCurrentTrackDriverId] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [showAddTrackDriverTr, setShowAddTrackDriverTr] = useState(false);
  const [showAddTrackTr, setShowAddTrackTr] = useState(false);

  useEffect(() => {
    if (chosenId != null) {
      setDriversList(driversListFull.filter((elem) => elem._id == chosenId));
    } else {
      setDriversList(driversListFull.filter((elem) => elem.active));
      setDriverListChoise(driversListFull.filter((elem) => elem.active));
    }
  }, [driversListFull]);
  useEffect(() => {
    setReset(false);
  }, [reset]);
  useEffect(() => {
    if (chosenId != null) {
      let arr = trackdriversFull.filter((elem) => elem.idOwner == chosenId);
      setTrackDrivers(arr);
    } else {
      setTrackDrivers(trackdriversFull.filter((elem) => elem.active));
    }
  }, [trackdriversFull]);
  useEffect(() => {
    if (chosenId != null) {
      let arr = tracklistFull.filter((elem) => elem.idOwner == chosenId);
      setTrackList(arr);
    } else {
      setTrackList(trackdriversFull.filter((elem) => elem.active));
    }
  }, [tracklistFull]);

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
    setTrackList(tracklistFull.filter((elem) => elem.idOwner == data._id));
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
  const getCurrentTrackDriverId = (id) => {
    setCurrentTrackDriverId(id);
  };
  const getCurrentTrackId = (id) => {
    setCurrentTrackId(id);
  };
  const handleClickAddInfo = () => {
    if (activeMarker == "driver") {
      setShowAddTrackDriverTr(true);
    }
    if (activeMarker == "track") {
      setShowAddTrackTr(true);
    }
  };
  const handleAddTrackDriver = (data) => {
    dispatch(addData(data, "trackdrivers"));
    setShowAddTrackDriverTr(false);
  };
  const handleAddTrack = (data) => {
    dispatch(addData(data, "tracklist"));
    setShowAddTrackTr(false);
  };
  const handleClickClipboard = () => {
    let trackdriver = trackdrivers.find(
      (elem) => elem._id == currentTrackDriverId
    );
    let bufferText = `
    ${trackdriver.name}
    паспорт: ${trackdriver.passportNumber} выдан ${
      trackdriver.department
    } ${dateLocal(trackdriver.dateOfIssue)}
    водительское удостоверение: ${trackdriver.driverLicense}
    телефон: ${trackdriver.phoneNumber}`;
    console.log(bufferText);
    navigator.clipboard
      .writeText(bufferText)
      .then(() => {
        // Получилось!
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
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
              {currentTrackDriverId !== null && (
                <button className="driverAddBtn" onClick={handleClickClipboard}>
                  Копировать в буфер обмена
                </button>
              )}
              <button className="driverAddBtn" onClick={handleClickAddInfo}>
                {nameAddBtn}
              </button>
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
                          getCurrentId={getCurrentTrackDriverId}
                          currentId={currentTrackDriverId}
                        />
                      );
                    })}
                    {showAddTrackDriverTr && (
                      <TrackDraverAddTr
                        handleAddTrackDriver={handleAddTrackDriver}
                        driverId={chosenId}
                      />
                    )}
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
                  <tbody className="trackDriverTbody">
                    {trackList.map((elem) => {
                      return (
                        <TrackTr
                          key={"track" + elem._id}
                          elem={elem}
                          getCurrentId={getCurrentTrackId}
                          currentId={currentTrackId}
                        />
                      );
                    })}
                    {showAddTrackTr && (
                      <TrackAddTr
                        handleAddTrack={handleAddTrack}
                        driverId={chosenId}
                      />
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
