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
  const [editAddress, setEditAddress] = useState(false);
  const [editText, setEditText] = useState(false);
  const [inputAddress, setInputAddress] = useState("");

  useEffect(() => {
    if (props.pointList.length != 0) setShowAddPoint(false);
    setPointData({});
  }, [props]);
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        setEditDate(false);
        setEditPoint(false);
        setEditStore(false);
        setEditText(false);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, []);

  const handleDateBlur = (e) => {
    let obj = { ...pointData };
    obj.date = e.currentTarget.value;
    setPointData(obj);
    let inputCity = document.querySelector("#point");
    inputCity.focus();
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
  const handlePointBlur = () => {
    if (pointData.idPoint) {
      let inputStore = document.querySelector("#store");
      inputStore.focus();
    }
  };
  const handlePointEnter = (e) => {
    if (e.key == "Enter") {
      if (pointData.idPoint) {
        let inputStore = document.querySelector("#store");
        inputStore.focus();
      }
    }
  };
  const setStore = (data) => {
    let obj = { ...pointData };
    obj.storeId = data._id;
    let store = storelist.find((store) => store._id == data._id);
    obj.address = store.address;
    setPointData(obj);
    setInputAddress(store.address);
    let inputTextInfo = document.querySelector("#textInfo");
    inputTextInfo.focus();
  };
  const handleStoreBlur = () => {
    if (pointData.storeId) {
      let inputText = document.querySelector("#address");
      inputText.focus();
    }
  };
  const handleStoreEnter = (e) => {
    if (e.key == "Enter") {
      if (pointData.storeId) {
        let inputText = document.querySelector("#address");
        inputText.focus();
      }
    }
  };
  const setAddress = (e) => {
    setInputAddress(e.currentTarget.value);
  };
  const handleBlurAddress = (e) => {
    let obj = { ...pointData };
    obj.address = e.currentTarget.value;
    setPointData(obj);
    let inputText = document.querySelector("#textInfo");
    inputText.focus();
  };
  const handleAddressEnter = (e) => {
    if (e.key == "Enter") {
      let obj = { ...pointData };
      setPointData(obj);
      obj.address = e.currentTarget.value;
      let inputText = document.querySelector("#textInfo");
      inputText.focus();
    }
  };
  const handleBlurText = (e) => {
    let obj = { ...pointData };
    obj.text = e.currentTarget.value;
    setPointData(obj);
    console.log(pointData);
    if (pointData.date == "" || !pointData.idPoint) {
      if (pointData.date == "") {
        let inputDate = document.querySelector("#customerPointDate");
        inputDate.focus();
      }
      if (!pointData.idPoint) {
        let inputPoint = document.querySelector("#point");
        inputPoint.focus();
      }
    } else {
      props.addPointData(obj, props.name);
    }
  };
  const handleTextEnter = (e) => {
    if (e.key == "Enter") {
      let obj = { ...pointData };
      obj.text = e.currentTarget.value;
      setPointData(obj);
      console.log(pointData);
      if (pointData.date == "" || !pointData.idPoint) {
        if (pointData.date == "") {
          let inputDate = document.querySelector("#customerPointDate");
          inputDate.focus();
        }
        if (!pointData.idPoint) {
          let inputPoint = document.querySelector("#point");
          inputPoint.focus();
        }
      } else {
        props.addPointData(obj, props.name);
      }
    }
  };
  const handleDblClick = (name, index) => {
    if (name == "date") setEditDate(true);
    if (name == "point") setEditPoint(true);
    if (name == "store") setEditStore(true);
    if (name == "address") setEditAddress(true);
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
  const handleEditAddress = (e) => {
    props.editData(props.name, "address", e.currentTarget.value, selectedIndex);
    setEditAddress(false);
  };
  const handleEditText = (e) => {
    props.editData(props.name, "text", e.currentTarget.value, selectedIndex);
    setEditText(false);
  };
  const handleCkickPlus = () => {
    setShowAddPoint(true);
  };
  const handleClickMinis = (index) => {
    props.delPoint(props.name, index);
  };
  return (
    <div className="customerPointFormDiv">
      <header className="customerPointFormHeader">
        <h5 className="customerPointFormHeaderH5">Дата</h5>
        <h5 className="customerPointFormHeaderH5">Город</h5>
        <h5 className="customerPointFormHeaderH5">Склад</h5>
        <h5 className="customerPointFormHeaderH5">Адрес</h5>
        <h5 className="customerPointFormHeaderH5">Примечание</h5>
      </header>
      <main className="customerPointFormMain">
        {props.pointList.map((pointId, index) => {
          let point = citiesList.find((point) => point._id == pointId);
          let store = props.storeList
            ? storelist.find((store) => store._id == props.storeList[index])
            : null;
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
                  className="customerPointSpan"
                  onDoubleClick={() => {
                    handleDblClick("date", index);
                  }}
                >
                  {props.dateList ? props.dateList[index] : null}
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
                  className="customerPointSpan"
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
                  className="customerPointSpan"
                  onDoubleClick={() => {
                    handleDblClick("store", index);
                  }}
                >
                  {store ? store.value : null}
                </span>
              )}
              {editAddress && selectedIndex == index ? (
                <div className="customerPointInputWrapper">
                  <input
                    type="text"
                    id="address"
                    className="customerPointInput"
                    onBlur={handleEditAddress}
                  />
                </div>
              ) : (
                <span
                  className="customerPointSpan"
                  onDoubleClick={() => {
                    handleDblClick("address", index);
                  }}
                >
                  {props.addressList[index]}
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
                  className="customerPointSpan"
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
                id="customerPointDate"
                className="customerPointInput"
                onBlur={handleDateBlur}
                onKeyDown={handleDateEnter}
              />
            </div>
            <div
              className="customerPointInputWrapper"
              onKeyDown={handlePointEnter}
              onBlur={handlePointBlur}
            >
              <ChoiseList
                name="point"
                arrlist={citiesList}
                setValue={setPoint}
              />
            </div>
            <div
              className="customerPointInputWrapper"
              onKeyDown={handleStoreEnter}
              onBlur={handleStoreBlur}
            >
              <ChoiseList
                name="store"
                arrlist={storelistInput}
                setValue={setStore}
              />
            </div>
            <div className="customerPointInputWrapper">
              <input
                type="text"
                id="address"
                className="customerPointInput"
                value={inputAddress}
                onChange={setAddress}
                onBlur={handleBlurAddress}
                onKeyDown={handleAddressEnter}
              />
            </div>
            <div className="customerPointInputWrapper">
              <input
                type="text"
                id="textInfo"
                className="customerPointInput"
                onBlur={handleBlurText}
                onKeyDown={handleTextEnter}
              />
            </div>
          </div>
        ) : (
          <div className="customerPointDataDiv">
            <div className="wrapprDivSVG" onClick={handleCkickPlus}>
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
          </div>
        )}
      </main>
    </div>
  );
};
