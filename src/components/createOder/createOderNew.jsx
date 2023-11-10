import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { PointsForm } from "./pointsForm.jsx";
import {
  addOder,
  addOrderApp,
  editOderNew,
} from "../../actions/oderActions.js";
import { dateLocal, findValueBy_Id } from "../myLib/myLib.js";
import { InputText } from "../myLib/inputText.jsx";
import "./createOder.sass";

export const CreateOderNew = (props) => {
  const driverlist = useSelector((state) => state.oderReducer.driverlist);
  const oderslist = useSelector((state) => state.oderReducer.clientList);
  const clientManagerFull = useSelector(
    (state) => state.oderReducer.clientmanager
  );
  const trackdriversFull = useSelector(
    (state) => state.oderReducer.trackdrivers
  );
  const pointList = useSelector((state) => state.oderReducer.citieslist);
  const tracksFull = useSelector((state) => state.oderReducer.tracklist);
  const addtable = useSelector((state) => state.oderReducer.addtable);
  const dispatch = useDispatch();

  const [mainDivStyle, setMainDivStyle] = useState("crOderMainDiv");

  const [odersData, setOdersData] = useState({
    idLoadingPoint: [],
    idUnloadingPoint: [],
    valueLoadingPoint: [],
    valueUnloadingPoint: [],
    loadingInfo: [],
    unloadingInfo: [],
    price: 0,
    interest: 10,
  });

  const [clientManager, setClientManager] = useState(clientManagerFull);
  const [trackdrivers, setTrackdrivers] = useState(trackdriversFull);
  const [tracks, setTracks] = useState(tracksFull);
  const [showDateInput, setShowDateInput] = useState(true);
  const [showClientInput, setShowClientInput] = useState(true);
  const [showManagerInput, setShowManagerInput] = useState(true);
  const [showAppInput, setShowAppInput] = useState(true);
  const [showClientPrice, setShowClientPrice] = useState(true);
  const [showOwnerInput, setShowOwnerInput] = useState(true);
  const [showTrackDriverInput, setShowTrackDriverInput] = useState(true);
  const [showTrackInput, setShowTrackInput] = useState(true);
  const [showDriverPrice, setShowDriverPrice] = useState(true);
  const [checkBox, setCheckBox] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [btnName, setBtnName] = useState("Добавить");
  const [showAddFields, setShowAddFields] = useState(false);

  useEffect(() => {
    if (props.clickSave) setMainDivStyle("crOderMainDiv");
    if (props.elem) {
      let { ...obj } = props.elem;
      obj.valueLoadingPoint = [];
      obj.valueUnloadingPoint = [];
      if (obj.loadingInfo == null) obj.loadingInfo = [];
      if (obj.unloadingInfo == null) obj.unloadingInfo = [];
      if (props.clickSave || props.isMadeFromApp) {
        if (obj.date != null) {
          setShowDateInput(false);
        }
      }
      if (obj.idCustomer != null) {
        setShowClientInput(false);
        obj.valueCustomer = oderslist.find(
          (elem) => elem._id == obj.idCustomer
        ).value;
      }
      if (obj.idManager != null) {
        setShowManagerInput(false);
        obj.valueManager = clientManagerFull.find(
          (elem) => elem._id == obj.idManager
        ).value;
      }
      if (obj.applicationNumber != null) {
        setShowAppInput(false);
      }
      if (obj.idDriver != null) {
        setShowOwnerInput(false);
        obj.valueDriver = driverlist.find(
          (elem) => elem._id == obj.idDriver
        ).value;
      }
      if (obj.idTrackDriver != null) {
        setShowTrackDriverInput(false);
        obj.valueTrackDriver = trackdriversFull.find(
          (elem) => elem._id == obj.idTrackDriver
        ).value;
      }
      if (obj.idTrack != null) {
        setShowTrackInput(false);
        obj.valueTrack = tracksFull.find(
          (elem) => elem._id == obj.idTrack
        ).value;
      }
      if (obj.idLoadingPoint != null) {
        obj.idLoadingPoint.forEach((elem) => {
          let pointValue = pointList.find((item) => item._id == elem).value;
          obj.valueLoadingPoint.push(pointValue);
        });
      }
      if (obj.idUnloadingPoint != null) {
        obj.idUnloadingPoint.forEach((elem) => {
          let pointValue = pointList.find((item) => item._id == elem).value;
          obj.valueUnloadingPoint.push(pointValue);
        });
      }
      if (obj.colorTR == "Blue") {
        setCheckBox(true);
      }
      if (obj.colorTR == "hotpink") {
        let addInfo = addtable.find((elem) => elem.orderId == obj._id);
        if (addInfo != undefined) {
          obj.price = addInfo.sum;
          obj.interest = addInfo.interest;
        }
      }
      setOdersData(obj);
      if (props.clickSave) setBtnName("Сохранить");
      setShowClientPrice(false);
      if (props.isMadeFromApp) {
        setShowDriverPrice(true);
      } else {
        setShowDriverPrice(false);
      }
    }
  }, []);

  useEffect(() => {
    setShowBtn(
      !(showDateInput || showClientInput || showClientPrice) &&
        odersData.idLoadingPoint.length > 0 &&
        odersData.idUnloadingPoint.length > 0
    );
  }, [odersData]);

  useEffect(() => {
    const secretKey = (e) => {
      if (e.code == "NumpadAdd" && e.ctrlKey) {
        e.preventDefault();
        // let div = document.querySelector("#createOrderDiv");
        // div.style.height = "400px";
        setShowAddFields(true);
      }
    };
    document.addEventListener("keydown", secretKey);
    return () => {
      document.removeEventListener("keydown", secretKey);
    };
  }, []);
  const handleChangeAppNumber = (e) => {
    let { ...obj } = odersData;
    obj.applicationNumber = e.currentTarget.value;
    setOdersData(obj);
  };
  const handleLostFocus = (e) => {
    let { ...obj } = odersData;
    if (e.target.className == "crOderDateInput") {
      let now = new Date();
      let date = new Date(e.target.value);
      if (date > now) {
        obj.completed = false;
      } else {
        obj.completed = true;
      }
      obj.date = e.target.value;
      if (e.target.value != "") {
        setShowDateInput(false);
        let emptyElem = document.querySelectorAll(".containerChoise");
        if (emptyElem.length > 0) {
          let nextFocus = emptyElem[0].firstChild;
          nextFocus.focus();
        }
      }
    }
    if (e.target.className == "crOderApplication") {
      obj.applicationNumber = e.target.value;
      if (e.target.value != "") setShowAppInput(false);
    }
    if (e.target.className == "crOderPriceInput") {
      if (props.elem.customerPayment != "Ок") {
        obj.customerPrice = e.target.value;
        if (e.target.value != "") setShowClientPrice(false);
      } else {
        alert("Change is unacceptable!!!");
        setShowClientPrice(false);
      }
    }
    if (e.target.className == "crOderDriverPriceInput") {
      if (props.elem.driverPayment != "Ок") {
        obj.driverPrice = e.target.value;
        if (e.target.value != "") setShowDriverPrice(false);
      }else{
        alert("Change is unacceptable!!!");
        setShowDriverPrice(false);
      }
    }
    setOdersData(obj);
  };
  const handleDblClick = (e) => {
    if (e.target.className == "crOderDateP") {
      setShowDateInput(true);
    }
    if (e.target.className == "crOderClientP") {
      setShowClientInput(true);
    }
    if (e.target.className == "crOderManagerP") {
      setShowManagerInput(true);
    }
    if (e.target.className == "crOderApplicationP") {
      setShowAppInput(true);
    }
    if (e.target.className == "crOderPriceP") {
      setShowClientPrice(true);
    }
    if (e.target.className == "crOderOwnerP") {
      setShowOwnerInput(true);
    }
    if (e.target.className == "crOderTrackDriverP") {
      setShowTrackDriverInput(true);
    }
    if (e.target.className == "crOderTrackP") {
      setShowTrackInput(true);
      let arr = tracksFull.filter((elem) => elem.idOwner == odersData.idDriver);
      setTracks(arr);
    }
    if (e.target.className == "crOderDriverPriceP") {
      setShowDriverPrice(true);
    }
  };
  const setValue = (value, e) => {
    let { ...obj } = odersData;
    if (value.field == "client") {
      obj.idCustomer = value._id;
      obj.valueCustomer = value.value;
      let arr = clientManagerFull.filter((elem) => elem.odersId == value._id);
      setClientManager(arr);
      setShowClientInput(false);
      let choiseElements = document.querySelectorAll(".containerChoise");
      if (choiseElements.length > 1) {
        let nextFocus = choiseElements[1].firstChild;
        nextFocus.focus();
      }
    }
    if (value.field == "manager") {
      obj.idManager = value._id;
      obj.valueManager = value.value;
      setShowManagerInput(false);
      //let nextFocus = document.querySelector(".PFContentPoint").firstChild;
      //nextFocus.focus();
    }
    if (value.field == "owner") {
      obj.idDriver = value._id;
      obj.valueDriver = value.value;
      setShowOwnerInput(false);
      let arr = trackdriversFull.filter((elem) => elem.idOwner == value._id);
      setTrackdrivers(arr);
      if (arr != undefined) {
        if (arr.length == 1) {
          obj.idTrackDriver = arr[0]._id;
          obj.valueTrackDriver = arr[0].value;
          setShowTrackDriverInput(false);
        } else {
          setShowTrackDriverInput(true);
        }
        if (arr.length == 0) {
          setShowTrackDriverInput(false);
        }
      }
      arr = tracksFull.filter((elem) => elem.idOwner == value._id);
      setTracks(arr);
      if (arr != undefined) {
        if (arr.length == 1) {
          obj.idTrack = arr[0]._id;
          obj.valueTrack = arr[0].value;
          setShowTrackInput(false);
        } else {
          setShowTrackInput(true);
        }
        if (arr.length == 0) {
          setShowTrackInput(false);
        }
      }
      /* let nextFocus = document.querySelector(".PFContentPoint").firstChild;
      nextFocus.focus(); */
    }
    if (value.field == "trackDriver") {
      obj.idTrackDriver = value._id;
      obj.valueTrackDriver = value.value;
      setShowTrackDriverInput(false);
      let trackId = findValueBy_Id(value._id, trackdrivers).idTrack;
      if (trackId != null) {
        obj.idTrack = trackId;
        obj.valueTrack = findValueBy_Id(trackId, tracks).value;
        setShowTrackInput(false);
      }
      /* let nextFocus = document.querySelector(".PFContentPoint").firstChild;
      nextFocus.focus(); */
    }
    if (value.field == "track") {
      obj.idTrack = value._id;
      obj.valueTrack = value.value;
      setShowTrackInput(false);
      /* let nextFocus = document.querySelector(".PFContentPoint").firstChild;
      nextFocus.focus(); */
    }
    setOdersData(obj);
  };

  const delPoint = (index, name) => {
    let { ...obj } = odersData;
    if (name == "LoadingPoint") {
      obj.idLoadingPoint.splice(index, 1);
      obj.valueLoadingPoint.splice(index, 1);
      obj.loadingInfo.splice(index, 1);
    }
    if (name == "UnloadingPoint") {
      obj.idUnloadingPoint.splice(index, 1);
      obj.valueUnloadingPoint.splice(index, 1);
      obj.unloadingInfo.splice(index, 1);
    }
    setOdersData(obj);
  };
  const addPoint = (data, name) => {
    let { ...obj } = odersData;
    if (name == "LoadingPoint") {
      obj.idLoadingPoint.push(data.id);
      obj.valueLoadingPoint.push(data.value);
      obj.loadingInfo.push(data.info);
    }
    if (name == "UnloadingPoint") {
      obj.idUnloadingPoint.push(data.id);
      obj.valueUnloadingPoint.push(data.value);
      obj.unloadingInfo.push(data.info);
    }
    setOdersData(obj);
  };
  const editPoint = (data, name, index) => {
    let { ...obj } = odersData;
    if (name == "LoadingPoint") {
      console.log(obj, data, name, index);
      obj.loadingInfo[index] = data;
    }
    if (name == "UnloadingPoint") {
      console.log(obj, data, name, index);
      obj.unloadingInfo[index] = data;
    }
    setOdersData(obj);
  };
  const handleCheck = (e) => {
    let { ...obj } = odersData;
    if (e.currentTarget.checked) {
      obj.colorTR = "Blue";
      setCheckBox(true);
    } else {
      obj.colorTR = "Black";
      setCheckBox(false);
    }
    setOdersData(obj);
  };
  const handleClick = () => {
    let check = true;
    if (
      Number(odersData.customerPrice) * 0.95 <
      Number(odersData.driverPrice)
    ) {
      check = confirm("Наценка меньше 5 % !! Продолжить?");
    }
    if (check) {
      if (btnName == "Добавить") {
        if (props.isMadeFromApp) {
          dispatch(addOrderApp(odersData, props.appId));
          props.addOder();
        } else {
          dispatch(addOder(odersData));
          props.addOder();
        }
      }
      if (btnName == "Сохранить") {
        let isChanged = false;
        for (let key in props.elem) {
          if (
            key != "idLoadingPoint" ||
            key != "idUnloadingPoint" ||
            key != "loadingInfo" ||
            key != "unloadingInfo"
          ) {
            if (props.elem[key] != odersData[key]) isChanged = true;
          } else {
            props.elem[key].forEach((elem, index) => {
              if (elem != odersData[key][index]) isChanged = true;
            });
          }
        }
        if (isChanged && props.elem.accountNumber != null) {
          isChanged = confirm("Заказ изменен, необходимо перевыставить счет?");
        } else {
          isChanged = false;
        }
        dispatch(editOderNew(odersData));
        props.clickSave(isChanged);
      }
    }
  };
  const getText = (name, text) => {
    let { ...obj } = odersData;
    obj.colorTR = "hotpink";
    if (name == "price") obj.price = text;
    if (name == "interest") obj.interest = text;
    setOdersData(obj);
  };

  return (
    <div className={mainDivStyle} id="createOrderDiv">
      <h4 className="crOderCustomerHeader">
        Информация о заказе{" "}
        {props.elem != undefined && props.elem.accountNumber
          ? props.elem.accountNumber
          : null}
      </h4>
      <div className="crOderCustomDiv">
        <div className="crOderDate">
          <h4 className="crOderCustomHeader">Дата</h4>
          {showDateInput ? (
            <div className="containerInput">
              <input
                type="date"
                className="crOderDateInput"
                onBlur={handleLostFocus}
              />
            </div>
          ) : (
            <div className="containerInput">
              <p
                className="crOderDateP"
                onDoubleClick={handleDblClick}
                onMouseDown={(e) => {
                  if (e.target.className == "crOderDateP") e.preventDefault();
                }}
              >
                {dateLocal(odersData.date)}
              </p>
            </div>
          )}
        </div>
        <div className="crOderCLient">
          <h4 className="crOderCustomHeader">Заказчик</h4>
          <div className="crOderCLientContent">
            <div className="crOderClientPart">
              <h5 className="crOderCustomHeader">Клиент</h5>
              {showClientInput ? (
                <div className="containerChoise">
                  <ChoiseList
                    name="client"
                    arrlist={oderslist}
                    setValue={setValue}
                  />
                </div>
              ) : (
                <p
                  className="crOderClientP"
                  onDoubleClick={handleDblClick}
                  onMouseDown={(e) => {
                    if (e.target.className == "crOderClientP")
                      e.preventDefault();
                  }}
                >
                  {odersData.valueCustomer}
                </p>
              )}
            </div>
            <div className="crOderClientPart">
              <h5 className="crOderCustomHeader">Менеджер</h5>
              {showManagerInput ? (
                <div className="containerChoise">
                  <ChoiseList
                    name="manager"
                    arrlist={clientManager}
                    setValue={setValue}
                  />
                </div>
              ) : (
                <p
                  className="crOderManagerP"
                  onDoubleClick={handleDblClick}
                  onMouseDown={(e) => {
                    if (e.target.className == "crOderManagerP")
                      e.preventDefault();
                  }}
                >
                  {odersData.valueManager}
                </p>
              )}
            </div>
          </div>
          <div className="applicationContainer">
            <h5 className="appHeader">Заявка</h5>
            {showAppInput ? (
              <input
                type="text"
                className="crOderApplication"
                value={odersData.applicationNumber}
                onChange={handleChangeAppNumber}
                onBlur={handleLostFocus}
              />
            ) : (
              <p
                className="crOderApplicationP"
                onDoubleClick={handleDblClick}
                onMouseDown={(e) => {
                  if (e.target.className == "crOderApplicationP")
                    e.preventDefault();
                }}
              >
                {odersData.applicationNumber}
              </p>
            )}
          </div>
        </div>
        <div className="crOderRoute">
          <h4 className="crOderCustomHeader routeH15px">Маршрут</h4>
          <div className="crOderRouteContent">
            <div className="crOderLoadPart">
              <h5 className="crOderLoadHeader routeH15px">Погрузка</h5>
              <PointsForm
                name="LoadingPoint"
                pointsList={odersData.valueLoadingPoint}
                infoList={odersData.loadingInfo}
                delPoint={delPoint}
                addPoint={addPoint}
                editPoint={editPoint}
              />
            </div>
            <div className="crOderUnloadPart">
              <h5 className="crOderUnloadHeader routeH15px">Разгрузка</h5>
              <PointsForm
                name="UnloadingPoint"
                pointsList={odersData.valueUnloadingPoint}
                infoList={odersData.unloadingInfo}
                delPoint={delPoint}
                addPoint={addPoint}
                editPoint={editPoint}
              />
            </div>
          </div>
        </div>
        <div className="crOderPrice">
          <h4 className="crOderCustomPriceHeader">Цена</h4>
          <div className="crOderPriceWrap">
            {showClientPrice ? (
              <input
                type="numnber"
                className="crOderPriceInput"
                onBlur={handleLostFocus}
              />
            ) : (
              <p
                className="crOderPriceP"
                onDoubleClick={handleDblClick}
                onMouseDown={(e) => {
                  if (e.target.className == "crOderPriceP") e.preventDefault();
                }}
              >
                {odersData.customerPrice} руб
              </p>
            )}
          </div>
        </div>
      </div>
      <h4 className="crOderDriverHeader">Информация о перевозчике</h4>
      <div className="crOderDriverDiv">
        <div className="crOderOwner">
          <h4 className="crOderOwnerHeader">Перевозчик</h4>
          {showOwnerInput ? (
            <div className="containerChoise">
              <ChoiseList
                name="owner"
                arrlist={driverlist}
                setValue={setValue}
              />
            </div>
          ) : (
            <p
              className="crOderOwnerP"
              onDoubleClick={handleDblClick}
              onMouseDown={(e) => {
                if (e.target.className == "crOderOwnerP") e.preventDefault();
              }}
            >
              {odersData.valueDriver}
            </p>
          )}
        </div>
        <div className="crOderTrackDriver">
          <h4 className="crOderTrackDriverHeader">Водитель</h4>
          {showTrackDriverInput ? (
            <div className="containerChoise">
              <ChoiseList
                name="trackDriver"
                arrlist={trackdrivers}
                setValue={setValue}
              />
            </div>
          ) : (
            <p
              className="crOderTrackDriverP"
              onDoubleClick={handleDblClick}
              onMouseDown={(e) => {
                if (e.target.className == "crOderTrackDriverP")
                  e.preventDefault();
              }}
            >
              {odersData.valueTrackDriver}
            </p>
          )}
        </div>
        <div className="crOderTrack">
          <h4 className="crOderTrackHeader">Номер АМ</h4>
          {showTrackInput ? (
            <div className="containerChoise">
              <ChoiseList name="track" arrlist={tracks} setValue={setValue} />
            </div>
          ) : (
            <p
              className="crOderTrackP"
              onDoubleClick={handleDblClick}
              onMouseDown={(e) => {
                if (e.target.className == "crOderTrackP") e.preventDefault();
              }}
            >
              {odersData.valueTrack}
            </p>
          )}
        </div>
        <div className="crOderPrice">
          <h4 className="crOderDriverPriceHeader">Цена</h4>
          <div className="crOderDriverPriceWrap">
            {showDriverPrice ? (
              <input
                type="numnber"
                className="crOderDriverPriceInput"
                onBlur={handleLostFocus}
              />
            ) : (
              <p
                className="crOderDriverPriceP"
                onDoubleClick={handleDblClick}
                onMouseDown={(e) => {
                  if (e.target.className == "crOderDriverPriceP")
                    e.preventDefault();
                }}
              >
                {odersData.driverPrice} руб
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="footer">
        {showAddFields && (
          <div className="addFields">
            <span>еще цена</span>
            <div className="wrapInput">
              <InputText
                name="price"
                typeInput="number"
                text={odersData.price}
                getText={getText}
              />
            </div>
            <span>проц</span>
            <div className="wrapInput">
              <InputText
                name="interest"
                typeInput="number"
                text={odersData.interest}
                getText={getText}
              />
            </div>
          </div>
        )}
        <div className="footerCheckBox">
          Выделить цветом{" "}
          <input type="checkbox" onChange={handleCheck} checked={checkBox} />
        </div>
        {showBtn && (
          <button className="crOdBtn" onClick={handleClick}>
            {btnName}
          </button>
        )}
      </div>
    </div>
  );
};
