import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { TrackAddTr } from "./trackAddTr.jsx";
import { TrackTr } from "./trackTr.jsx";
import { addData } from "../../actions/editDataAction.js";

import "./editData.sass";
export const TrackTable = (props) => {
  const dispatch = useDispatch();
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const tracklistFull = useSelector((state) => state.oderReducer.tracklist);

  const [driversList, setDriversList] = useState(driversListFull);
  const [trackList, setTrackList] = useState(tracklistFull);
  const [check, setCheck] = useState(true);
  const [chosenId, setChosenId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [showAddTr, setShowAddTr] = useState(false);

  const setValue = (data) => {
    let arr = tracklistFull.filter((elem) => elem.idOwner == data._id);
    setTrackList(arr);
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
  const handleClickAdd = () => {
    setShowAddTr(true);
  };
  const getCurrentId = (id) => {
    setCurrentId(id);
  };
  const handleAddTrack = (data) => {
    dispatch(addData(data, "tracklist"));
    setShowAddTr(false);
  };

  useEffect(() => {
    if (chosenId != null) {
      let arr = trackList.filter((elem) => elem.idOwner == chosenId);
      setTrackList(arr);
    } else {
      setTrackList(tracklistFull);
    }
    if (check) {
      setDriversList(driversListFull.filter((elem) => elem.active == 1));
    } else {
      setDriversList(driversListFull);
    }
  }, [tracklistFull]);

  return (
    <>
      <h2 className="driverH2">Таблица автомобилей</h2>
      <div className="driverFilter">
        <span>Перевозчик</span>
        <div className="driverChoise">
          <ChoiseList name="owner" arrlist={driversList} setValue={setValue} />
        </div>
        <span>Активный</span>
        <input type="checkbox" onChange={handleChangeBox} checked={check} />
        <button className="trackAddBtn" onClick={handleClickAdd}>
          Добавить
        </button>
      </div>
      <div className="tableDiv">
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
                  getCurrentId={getCurrentId}
                  currentId={currentId}
                />
              );
            })}
            {showAddTr && <TrackAddTr handleAddTrack={handleAddTrack} />}
          </tbody>
        </table>
      </div>
    </>
  );
};
