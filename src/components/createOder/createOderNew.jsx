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
  const customerlist = useSelector((state) => state.oderReducer.odersList);
  const dispatch = useDispatch();
  const [odersData, setOdersData] = useState({
    idLoadingPoint: [],
    idUnloadingPoint: [],
    valueLoadingPoint: ["Таганрог", "Ростов", "Батайск"],
    valueUnloadingPoint: [],
    loadingInfo: ["Терминал", "Доваторов, 154", "Совхозная, 4"],
    unloadingInfo: [],
  });

  const [clientManager, setClientManager] = useState(clientManagerFull);

  const [showDateInput, setShowDateInput] = useState(true);
  const [showClientInput, setShowClientInput] = useState(true);
  const [showManagerInput, setShowManagerInput] = useState(true);
  const [showLoadingPoint, setShowLoadingPoint] = useState(true);
  const [showUnloadingPoint, setShowUnloadingPoint] = useState(true);
  const [showLoadingInfo, setShowLoadingInfo] = useState(true);
  const [showUnloadingInfo, setShowUnloadingInfo] = useState(true);

  const handleLostFocus = (e) => {
    let { ...obj } = odersData;
    console.log(e.target.value);
    if (e.target.className == "crOderDateInput") {
      obj.date = e.target.value;
      if (e.target.value != "") setShowDateInput(false);
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
  };
  const setValue = (value) => {
    let { ...obj } = odersData;
    if (value.field == "client") {
      obj.idCustomer = value._id;
      obj.valueCustomer = value.value;
      let arr = clientManagerFull.filter((elem) => elem.odersId == value._id);
      setClientManager(arr);
      setShowClientInput(false);
    }
    if (value.field == "manager") {
      obj.idManager = value._id;
      obj.valueManager = value.value;
      setShowManagerInput(false);
    }
    console.log(obj);
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
              <h5 className="crOderLoadHeader routeH10px">Погрузка</h5>
              <PointsForm
                pointsList={odersData.valueLoadingPoint}
                infoList={odersData.loadingInfo}
              />
            </div>
            <div className="crOderUnloadPart">
              <h5 className="crOderUnloadHeader routeH10px">Разгрузка</h5>
              <PointsForm
                pointsList={odersData.valueUnloadingPoint}
                infoList={odersData.unloadingInfo}
              />
            </div>
          </div>
        </div>
        <div className="crOderPrice">
          <h4 className="crOderCustomHeader">Цена</h4>
        </div>
      </div>
    </div>
  );
};
