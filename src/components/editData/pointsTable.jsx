import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { addData, editData, delData } from "../../actions/editDataAction.js";

import "./editData.sass";

export const PointsTable = () => {
  const dispatch = useDispatch();
  const citieslistFull = useSelector((state) => state.oderReducer.citieslist);
  const storeList = useSelector((state) => state.oderReducer.storeList);

  const [citieslist, setCitieslist] = useState(citieslistFull);
  const [chosenPoint, setChosenPoint] = useState(null);
  const [chosenId, setChosenId] = useState(null);
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [showAddTr, setShowAddTr] = useState(false);
  const [addPointObj, setAddPointObj] = useState({});
  const [showStoreList, setShowStoreList] = useState(false);
  const [storeListFiltered, setStoreListFiltered] = useState(storeList);
  const [city, setCity] = useState("");

  const setValue = (data) => {
    let arr = citieslistFull.filter((elem) => elem._id == data._id);
    setCitieslist(arr);
    setChosenPoint(data._id);
    setCity(data.value);
    setShowStoreList(true);
    let arrStore = storeList.filter((elem) => elem.idCity == data._id);
    setStoreListFiltered(arrStore);
  };
  const handleClickTr = (id) => {
    setChosenId(id);
  };
  const handleDBLclick = (e) => {
    let column = e.currentTarget.cellIndex;
    setColNumber(column);
    e.currentTarget.width = e.currentTarget.offsetWidth - 2 + "px";
    e.currentTarget.height = e.currentTarget.offsetHeight - 2 + "px";
    setCurrentElement(e.currentTarget);
  };
  const handleEnter = (e, elem) => {
    if (e.key == "Enter") {
      let { ...obj } = elem;
      switch (colNumber) {
        case 0:
          obj.value = e.currentTarget.value;
          break;
        case 1:
          obj.region = e.currentTarget.value;
          break;
        default:
          break;
      }
      setColNumber(null);
      dispatch(editData(obj, "cities"));
    }
  };
  const handleClickDelete = () => {
    let password = prompt("Подтвердите удаление", "Пароль");
    if (password == "Пароль") {
      console.log(chosenId);
      dispatch(delData(chosenId, "cities"));
    }
  };
  const handleClickAdd = () => {
    setShowAddTr(true);
    setColNumber(0);
    setChosenId(null);
  };
  const handleInputBlur = (e) => {
    let { ...obj } = addPointObj;
    switch (colNumber) {
      case 0:
        obj.value = e.currentTarget.value;
        setColNumber(colNumber + 1);
        break;
      case 1:
        obj.region = e.currentTarget.value;
        if (obj.value != "" && obj.value != undefined) {
          dispatch(addData(obj, "cities"));
          setShowAddTr(false);
          setColNumber(null);
        }
        break;
      default:
        break;
    }
    setAddPointObj(obj);
  };
  const handleEnterAdd = (e) => {
    if (e.key == "Enter") {
      if (addPointObj.value != "" && addPointObj.value != undefined) {
        dispatch(addData(addPointObj, "cities"));
        setShowAddTr(false);
        setColNumber(null);
      } else {
        setColNumber(0);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addPointObj;
          obj.value = e.currentTarget.value;
          dispatch(addData(obj, "cities"));
          setShowAddTr(false);
          setColNumber(null);
        }
      }
    }
  };
  const handleClickReset = () => {
    setCitieslist(citieslistFull);
    setShowStoreList(false);
  };

  useEffect(() => {
    if (chosenPoint != null) {
      let arr = citieslistFull.filter((elem) => elem._id == chosenPoint);
      setCitieslist(arr);
    } else {
      setCitieslist(citieslistFull);
    }
  }, [citieslistFull]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.focus();
  }, [currentElement]);
  useEffect(() => {
    let div = document.querySelector(".tableDiv");
    div.scrollTop = div.scrollHeight;
  }, [showAddTr]);
  useEffect(() => {
    if (colNumber < 2 && colNumber != null && showAddTr) {
      let parent = document.querySelector(".pointAddTr");
      let input = parent.querySelector(".pointTrInput");
      input.focus();
    }
  }, [colNumber]);
  return (
    <>
      <h2 className="pointsH2">ТАблица пунктов погрузки/выгрузки</h2>
      <div className="driverFilter">
        <div className="pointChoise">
          <ChoiseList
            name="point"
            arrlist={citieslistFull}
            setValue={setValue}
          />
        </div>
        <button className="pointAddBtn" onClick={handleClickReset}>
          Сброс
        </button>
        <button className="pointAddBtn" onClick={handleClickAdd}>
          Добавить
        </button>
      </div>
      <div className="tableDiv">
        <table className="pointsTbl">
          <thead>
            <tr>
              <td className="pointsTdHeader">Пункт погрузки/выгрузки</td>
              <td className="pointsTdHeader">Область</td>
            </tr>
          </thead>
          <tbody className="trackDriverTbody">
            {citieslist.map((elem) => {
              return (
                <tr
                  key={"point" + elem._id}
                  onClick={() => handleClickTr(elem._id)}
                  className={elem._id == chosenId ? "pointActiveTr" : ""}
                >
                  <td className="pointTd" onDoubleClick={handleDBLclick}>
                    {colNumber == 0 && elem._id == chosenId ? (
                      <input
                        type="text"
                        className="pointTrInput"
                        onKeyDown={(e) => handleEnter(e, elem)}
                      />
                    ) : (
                      elem.value
                    )}
                  </td>
                  <td className="pointTd" onDoubleClick={handleDBLclick}>
                    {colNumber == 1 && elem._id == chosenId ? (
                      <input
                        type="text"
                        className="pointTrInput"
                        onKeyDown={(e) => handleEnter(e, elem)}
                      />
                    ) : (
                      elem.region
                    )}
                    {elem._id == chosenId && (
                      <div
                        className="customerPaymentTrClose"
                        onClick={handleClickDelete}
                      >
                        <svg width="20px" height="20px" viewBox="0 0 60 60">
                          <g transform="translate(232.000000, 228.000000)">
                            <polygon points="-207,-205 -204,-205 -204,-181 -207,-181    " />
                            <polygon points="-201,-205 -198,-205 -198,-181 -201,-181    " />
                            <polygon points="-195,-205 -192,-205 -192,-181 -195,-181    " />
                            <polygon points="-219,-214 -180,-214 -180,-211 -219,-211    " />
                            <path d="M-192.6-212.6h-2.8v-3c0-0.9-0.7-1.6-1.6-1.6h-6c-0.9,0-1.6,0.7-1.6,1.6v3h-2.8v-3     c0-2.4,2-4.4,4.4-4.4h6c2.4,0,4.4,2,4.4,4.4V-212.6" />
                            <path d="M-191-172.1h-18c-2.4,0-4.5-2-4.7-4.4l-2.8-36l3-0.2l2.8,36c0.1,0.9,0.9,1.6,1.7,1.6h18     c0.9,0,1.7-0.8,1.7-1.6l2.8-36l3,0.2l-2.8,36C-186.5-174-188.6-172.1-191-172.1" />
                          </g>
                        </svg>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            {showAddTr && (
              <tr className="pointAddTr">
                <td className="pointTd">
                  {colNumber == 0 ? (
                    <input
                      type="text"
                      onBlur={handleInputBlur}
                      className="pointTrInput"
                      onKeyDown={handleEnterAdd}
                    />
                  ) : (
                    addPointObj.value
                  )}
                </td>
                <td className="pointTd">
                  {colNumber == 1 ? (
                    <input
                      type="text"
                      onBlur={handleInputBlur}
                      className="pointTrInput"
                      onKeyDown={handleEnterAdd}
                    />
                  ) : (
                    addPointObj.region
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {showStoreList && (
          <table className="storeTable">
            <thead>
              <tr>
                <td className="storeTd">Склад</td>
                <td className="storeTd">Город</td>
                <td className="storeTd">Адрес</td>
              </tr>
            </thead>
            <tbody>
              {storeListFiltered.map((elem) => {
                return (
                  <tr>
                    <td className="storeTd">{elem.value}</td>
                    <td className="storeTd">{city}</td>
                    <td className="storeTd">{elem.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
