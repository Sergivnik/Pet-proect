import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseTwoList } from "../choiseList/choiseTwoList.jsx";
import { DriverAddTr } from "./driverAddTr.jsx";
import { DriverTableTR } from "./driverTableTR.jsx";
import { TrackDriverTr } from "./trackDriverTr.jsx";
import { TrackDraverAddTr } from "./trackDriverAddTr.jsx";
import { TrackTr } from "./trackTr.jsx";
import { TrackAddTr } from "./trackAddTr.jsx";
import { FormAddDoc } from "../userTrNew/formAddDoc.jsx";
import { addData } from "../../actions/editDataAction.js";
import { dateLocal, dateLocalZone } from "../myLib/myLib.js";
import { DOMENNAME } from "../../middlewares/initialState.js";
import { FormAddEmailData } from "../userTrNew/fornAddEmailData.jsx";
import { DriverAccountTr } from "./driverAccountTr.tsx";
import { UserWindow } from "../userWindow/userWindow.jsx";
import axios from "axios";
import "./editData.sass";
import { DriverContractForm } from "./contractForm/driverContractForm.jsx";

export const DriverTable = ({ id }) => {
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
  const [currentOwnerId, setCurrentOwnerId] = useState(null);
  const [showAddTrackDriverTr, setShowAddTrackDriverTr] = useState(false);
  const [showAddTrackTr, setShowAddTrackTr] = useState(false);
  const [showInputFile, setShowInputFile] = useState(false);
  const [currentTD, setCurrentTD] = useState(null);
  const [embedURL, setEmbedURL] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [text, setText] = useState("");
  const [newDriver, setNewDriver] = useState(undefined);
  const [showFormCreateDoc, setShowFormCreateDoc] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(undefined);

  useEffect(() => {
    console.log("here");
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
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        setShowAddTr(false);
        setShowAddTrackDriverTr(false);
        setShowAddTrackTr(false);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, []);
  useEffect(() => {
    if (newDriver) {
      let arr = driversListFull.filter((elem) => elem.value == newDriver.value);
      if (arr.length == 1) {
        setDriversList(arr);
        setChosenId(arr[0]._id);
        setShowInfo(true);
        setNewDriver(undefined);
      }
    }
  }, [driversListFull]);
  useEffect(() => {
    let arr = driversListFull.filter((elem) => elem._id == id);
    setDriversList(arr);
    setChosenId(id);
    setShowInfo(true);
    setTrackDrivers(trackdriversFull.filter((elem) => elem.idOwner == id));
    setTrackList(tracklistFull.filter((elem) => elem.idOwner == id));
  }, [id]);

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
    setNewDriver(data);
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
      setEmbedURL("");
    }
    if (markerDiv.id == "track") {
      setNameAddBtn("Добавить автомобиль");
      setActiveMarker("track");
      setEmbedURL("");
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
    axios
      .get(DOMENNAME + `/API/getPdf/${id}/driver`, { responseType: "blob" })
      .then((res) => {
        let blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        console.log(url);
        setEmbedURL(url);
        //URL.revokeObjectURL(embedURL);
      })
      .catch((e) => {
        setEmbedURL("");
        console.log(e.message);
      });
    setCurrentTrackDriverId(id);
  };
  const getCurrentTrackId = (id) => {
    axios
      .get(DOMENNAME + `/API/getPdf/${id}/track`, { responseType: "blob" })
      .then((res) => {
        let blob = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        console.log(url);
        setEmbedURL(url);
        //URL.revokeObjectURL(embedURL);
      })
      .catch((e) => {
        setEmbedURL("");
        console.log(e.message);
      });

    setCurrentTrackId(id);
  };
  const handleOnLoad = (e) => {
    console.log("file loaded", e);
    URL.revokeObjectURL(embedURL);
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
    let track = tracklistFull.find((elem) => elem._id == trackdriver.idTrack);
    let bufferText = `
    ${trackdriver.name}
    паспорт: ${trackdriver.passportNumber} выдан ${
      trackdriver.department
    } ${dateLocal(trackdriver.dateOfIssue)}
    водительское удостоверение: ${trackdriver.driverLicense}
    телефон: ${trackdriver.phoneNumber}
    А/М ${track.model} номер ${track.value}
    прицеп номер ${track.trackTrailerLicensePlate}`;
    setText(bufferText);
    console.log(bufferText);
    let textArea = document.createElement("textarea");
    textArea.value = bufferText;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  };
  const handleClickAddDoc = () => {
    let currentElement = document.querySelector(".EDFmainForm");
    setCurrentTD(currentElement);
    setShowInputFile(true);
  };
  const handleClickClose = () => {
    setShowInputFile(false);
    setShowEmail(false);
    setShowFormCreateDoc(false);
  };
  const handleClickEmail = () => {
    let currentElement = document.querySelector(".EDFmainForm");
    setCurrentTD(currentElement);
    setShowEmail(true);
  };
  const openFormAddDoc = (id) => {
    let currentElement = document.querySelector(".EDFmainForm");
    setCurrentTD(currentElement);
    setActiveMarker("owner");
    setCurrentOwnerId(id);
    setShowInputFile(true);
  };
  const openFormCreatContract = (id) => {
    let driver = driversListFull.find((driver) => driver._id == id);
    setCurrentDriver(driver);
    setShowFormCreateDoc(true);
  };

  return (
    <>
      <h2 className="driverH2">Таблица перевозчиков</h2>
      <div className="driverFilter">
        <span>Перевозчик</span>
        <div className="driverChoise">
          <ChoiseTwoList
            arr1={driverListChoise}
            arr2={trackdriversFull}
            field1="value"
            field2="shortName"
            fieldSearch="idOwner"
            setValue={setValue}
            reset={reset}
          />
          {/* <ChoiseList
            name="owner"
            arrlist={driverListChoise}
            setValue={setValue}
            reset={reset}
          /> */}
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
                  openFormAddDoc={openFormAddDoc}
                  openFormCreatContract={openFormCreatContract}
                />
              );
            })}
            {showAddTr && <DriverAddTr handleAddDriver={handleAddDriver} />}
          </tbody>
        </table>
        {driversList.length == 1 && (
          <table className="driverTbl zindex2">
            <thead>
              <tr>
                <td className="driverTdHeader">КПП</td>
                <td className="driverTdHeader">ОГРНИП</td>
                <td className="driverTdHeader">р/сч</td>
                <td className="driverTdHeader">кор/сч</td>
                <td className="driverTdHeader">БИК</td>
                <td className="driverTdHeader">ФИО директора в род. падеже</td>
                <td className="driverTdHeader">Банк</td>
                <td className="driverTdHeader">Адрес банка</td>
              </tr>
            </thead>
            <tbody>
              <DriverAccountTr driver={driversList[0]} />
            </tbody>
          </table>
        )}
        {showInfo && (
          <div className="driverInfoWraper">
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
              {currentTrackDriverId !== null && (
                <button className="driverAddBtn" onClick={handleClickAddDoc}>
                  {activeMarker == "driver"
                    ? "Добавить докумены водителя"
                    : "Добавить документы АМ"}
                </button>
              )}
              {currentTrackDriverId !== null && (
                <button className="driverAddBtn" onClick={handleClickEmail}>
                  Отправить Email
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
                    <tr className="trackDriverTr">
                      <td className="trackDriverTdHeader">Имя</td>
                      <td className="trackDriverTdHeader">Полное имя</td>
                      <td className="trackDriverTdHeader">Краткое имя</td>
                      <td className="trackDriverTdHeader">Паспорт номер</td>
                      <td className="trackDriverTdHeader w400">Выдан</td>
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
              <div className="trackDriverEmbedWrap">
                <embed src={embedURL} width={500} onLoad={handleOnLoad} />
              </div>
            </div>
          </div>
        )}
      </div>
      {showInputFile ? (
        <FormAddDoc
          TD={currentTD}
          currentId={
            activeMarker == "driver"
              ? currentTrackDriverId
              : activeMarker == "owner"
              ? currentOwnerId
              : currentTrackId
          }
          typeDoc={activeMarker}
          handleClickClose={handleClickClose}
        />
      ) : null}
      {showEmail && (
        <FormAddEmailData
          TD={currentTD}
          currentId={currentId}
          typeDoc={"driverDocs"}
          text={text}
          handleClickClose={handleClickClose}
        />
      )}
      {showFormCreateDoc && (
        <UserWindow
          header={`Создание нового договора ${currentDriver.companyName}`}
          width={800}
          handleClickWindowClose={handleClickClose}
          windowId="contractDriverAddWindow"
        >
          <DriverContractForm driver={currentDriver} />
        </UserWindow>
      )}
    </>
  );
};
