import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { PointsForm } from "./pointsForm.jsx";
import { addOder } from "../../actions/oderActions.js";
import "./createOder.sass";

export const CreateOderNew = (props) => {
  const driverlist = useSelector((state) => state.oderReducer.driverlist);
  const oderslist = useSelector((state) => state.oderReducer.clientList);
  const clientManagerFull = useSelector(
    (state) => state.oderReducer.clientmanager
  );
  const citieslist = useSelector((state) => state.oderReducer.citieslist);
  const dispatch = useDispatch();
  const [odersData, setOdersData] = useState({
    idLoadingPoint: [],
    idUnloadingPoint: [],
    valueLoadingPoint: [],
    valueUnloadingPoint: [],
    loadingInfo: [],
    unloadingInfo: [],
  });

  const [clientManager, setClientManager] = useState(clientManagerFull);
  const [showDateInput, setShowDateInput] = useState(true);
  const [showClientInput, setShowClientInput] = useState(true);
  const [showManagerInput, setShowManagerInput] = useState(true);

  const handleLostFocus = (e) => {
    let { ...obj } = odersData;
    console.log(e.target.value);
    if (e.target.className == "crOderDateInput") {
      obj.date = e.target.value;
      if (e.target.value != "") {
        setShowDateInput(false);
        let nextFocus =
          document.querySelectorAll(".containerChoise")[0].firstChild;
        nextFocus.focus();
      }
    }
    if (e.target.className=="crOderPriceInput"){
      obj.customerPrice = e.target.value;
    }
    setOdersData(obj);
    console.log(obj);
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
  };
  const setValue = (value, e) => {
    let { ...obj } = odersData;
    if (value.field == "client") {
      obj.idCustomer = value._id;
      obj.valueCustomer = value.value;
      let arr = clientManagerFull.filter((elem) => elem.odersId == value._id);
      setClientManager(arr);
      setShowClientInput(false);
      let nextFocus =
        document.querySelectorAll(".containerChoise")[1].firstChild;
      nextFocus.focus();
    }
    if (value.field == "manager") {
      obj.idManager = value._id;
      obj.valueManager = value.value;
      setShowManagerInput(false);
      let nextFocus = document.querySelector(".PFContentPoint").firstChild;
      nextFocus.focus();
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
  return (
    <div className="crOderMainDiv">
      <h4 className="crOderCustomerHeader">Информация о заказе</h4>
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
                {odersData.date}
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
              />
            </div>
          </div>
        </div>
        <div className="crOderPrice">
          <h4 className="crOderCustomHeader">Цена</h4>
          <div className="crOderPriceWrap">
            <input
              type="numnber"
              className="crOderPriceInput"
              onBlur={handleLostFocus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
