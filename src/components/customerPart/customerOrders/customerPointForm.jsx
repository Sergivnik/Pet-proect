import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../../choiseList/choiseList.jsx";
import "./customerOrders.sass";

export const CustomerPointForm = (props) => {
  const citiesList = useSelector((state) => state.customerReducer.citiesList);
  const storelist = useSelector((state) => state.customerReducer.storelist);

  const [showAddPoint, setShowAddPoint] = useState(true);
  const [pointData, setPointData] = useState({});
  const [storelistInput, setStoreListInput] = useState(storelist);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editDate, setEditDate] = useState(false);
  const [editPoint, setEditPoint] = useState(false);
  const [editStore, setEditStore] = useState(false);
  const [editText, setEditText] = useState(false);

  useEffect(() => {
    if (props.pointList.length != 0) setShowAddPoint(false);
  }, [props]);
  useEffect(() => {
    if (showAddPoint) {
      let inputDate = document.querySelector(".customerPointInput");
      inputDate.focus();
    }
  }, [showAddPoint]);

  const handleDateBlur = (e) => {
    let obj = { ...pointData };
    obj.date = e.currentTarget.value;
    if (e.currentTarget.value) {
      setPointData(obj);
      let inputCity = document.querySelector("#point");
      inputCity.focus();
    } else {
      e.currentTarget.focus();
    }
  };
  const handleDateEnter = (e) => {
    if (e.key == "Enter") {
      let obj = { ...pointData };
      obj.date = e.currentTarget.value;
      if (e.currentTarget.value) {
        setPointData(obj);
        let inputCity = document.querySelector("#point");
        inputCity.focus();
      } else {
        e.currentTarget.focus();
      }
    }
  };
  const setPoint = (data) => {
    let obj = { ...pointData };
    obj.idPoint = data._id;
    setPointData(obj);
    setStoreListInput(storelist.filter((store) => store.idCity == data._id));
    let inputStore = document.querySelector("#store");
    inputStore.focus();
  };
  const handlePointBlur = (e) => {
    if (pointData.idPoint) {
      let inputStore = document.querySelector("#store");
      e.currentTarget.style.borderColor = "black";
      inputStore.focus();
    } else {
      e.currentTarget.style.borderColor = "red";
    }
  };
  const setStore = (data) => {
    let obj = { ...pointData };
    obj.storeId = data._id;
    setPointData(obj);
    let inputTextInfo = document.querySelector("#textInfo");
    inputTextInfo.focus();
  };
  const handleBlurText = (e) => {
    let obj = { ...pointData };
    obj.text = e.currentTarget.value;
    setPointData(obj);
    props.addPointData(obj, props.name);
  };
  const handleDblClick = (name, index) => {
    if (name == "date") setEditDate(true);
    if (name == "point") setEditPoint(true);
    if (name == "store") setEditStore(true);
    if (name == "text") setEditText(true);
    setSelectedIndex(index);
  };
  const handleDateEditBlur = (e) => {
    props.editData(props.name, "date", e.currentTarget.value, selectedIndex);
    setEditDate(false);
  };
  const handleEditPoint = (data) => {
    props.editData(props.name, "point", data._id, selectedIndex);
    setEditPoint(false);
    setStoreListInput(storelist.filter((store) => store.idCity == data._id));
  };
  const handleEditStore = (data) => {
    console.log(data);
    props.editData(props.name, "store", data._id, selectedIndex);
    setEditStore(false);
  };
  const handleEditText = (e) => {
    props.editData(props.name, "text", e.currentTarget.value, selectedIndex);
    setEditText(false);
  };
  return (
    <div className="customerPointFormDiv">
      <header className="customerPointFormHeader">
        <h5 className="customerPointFormHeaderH5">Дата</h5>
        <h5 className="customerPointFormHeaderH5">Город</h5>
        <h5 className="customerPointFormHeaderH5">Склад</h5>
        <h5 className="customerPointFormHeaderH5">Примечание</h5>
      </header>
      <main className="customerPointFormMain">
        {props.pointList.map((pointId, index) => {
          let point = citiesList.find((point) => point._id == pointId);
          let store = storelist.find(
            (store) => store._id == props.storeList[index]
          );
          return (
            <div key={`pointData-${index}`} className="customerPointDataDiv">
              <div
                className="wrapprDivSVG"
                onClick={() => {
                  handleClickMinis(index);
                }}
              >
                <svg viewBox="0 0 120 120" className="PFBtnSvg">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="black"
                    strokeWidth="10"
                    fill="none"
                  />
                  <rect x="15" y="50" width="90" height="20" rx="10" ry="10" />
                </svg>
              </div>
              {editDate && selectedIndex == index ? (
                <div className="customerPointInputWrapper">
                  <input
                    type="date"
                    className="customerPointInput"
                    onBlur={handleDateEditBlur}
                  />
                </div>
              ) : (
                <span
                  onDoubleClick={() => {
                    handleDblClick("date", index);
                  }}
                >
                  {props.dateList[index]}
                </span>
              )}
              {editPoint && selectedIndex == index ? (
                <div className="customerPointInputWrapper">
                  <ChoiseList
                    name="point"
                    arrlist={citiesList}
                    setValue={handleEditPoint}
                  />
                </div>
              ) : (
                <span
                  onDoubleClick={() => {
                    handleDblClick("point", index);
                  }}
                >
                  {point ? point.value : null}
                </span>
              )}
              {editStore && selectedIndex == index ? (
                <div className="customerPointInputWrapper">
                  <ChoiseList
                    name="store"
                    arrlist={storelistInput}
                    setValue={handleEditStore}
                  />
                </div>
              ) : (
                <span
                  onDoubleClick={() => {
                    handleDblClick("store", index);
                  }}
                >
                  {store ? store.value : null}
                </span>
              )}
              {editText && selectedIndex == index ? (
                <div className="customerPointInputWrapper">
                  <input
                    type="text"
                    id="textInfo"
                    className="customerPointInput"
                    onBlur={handleEditText}
                  />
                </div>
              ) : (
                <span
                  onDoubleClick={() => {
                    handleDblClick("text", index);
                  }}
                >
                  {props.infoList[index]}
                </span>
              )}
            </div>
          );
        })}
        {showAddPoint ? (
          <div className="customerPointDataDiv">
            <div className="wrapprDivSVG">
              <svg viewBox="0 0 120 120" className="PFBtnSvg">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="black"
                  strokeWidth="10"
                  fill="none"
                />
                <rect x="15" y="50" width="90" height="20" rx="10" ry="10" />
              </svg>
            </div>
            <div className="customerPointInputWrapper">
              <input
                type="date"
                className="customerPointInput"
                onBlur={handleDateBlur}
                onKeyDown={handleDateEnter}
              />
            </div>
            <div className="customerPointInputWrapper" onBlur={handlePointBlur}>
              <ChoiseList
                name="point"
                arrlist={citiesList}
                setValue={setPoint}
              />
            </div>
            <div className="customerPointInputWrapper">
              <ChoiseList
                name="store"
                arrlist={storelistInput}
                setValue={setStore}
              />
            </div>
            <div className="customerPointInputWrapper">
              <input
                type="text"
                id="textInfo"
                className="customerPointInput"
                onBlur={handleBlurText}
              />
            </div>
          </div>
        ) : (
          <div>
            <svg viewBox="0 0 120 120" className="PFBtnSvg">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="black"
                strokeWidth="10"
                fill="none"
              />
              <rect x="15" y="50" width="90" height="20" rx="10" ry="10" />
              <rect x="50" y="15" width="20" height="90" rx="10" ry="10" />
            </svg>
          </div>
        )}
      </main>
    </div>
  );
};
