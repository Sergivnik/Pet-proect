import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dateLocal } from "../myLib/myLib";
import { DOMENNAME } from "../../middlewares/initialState.js";

import "./billsForm.sass";

export const AppForm = (props) => {
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const managerList = useSelector((state) => state.oderReducer.clientmanager);
  const citiesList = useSelector((state) => state.oderReducer.citieslist);

  const order = odersList.find(
    (elem) => elem._id == props.dataDoc.odersListId[props.id - 1]
  );
  const client = clientList.find((elem) => elem._id == order.idCustomer);
  const manager = order.idManager
    ? managerList.find((elem) => elem._id == order.idManager)
    : null;

  const styleDivRow = { display: "flex", marginBottom: "-1px", height: "20px" };
  const styleCellLeft = {
    width: "25%",
    border: "1px solid black",
  };
  const styleCellRight = {
    width: "75%",
    border: "1px solid black",
    marginLeft: "-1px",
    display: "flex",
    justifyContent: "space-between",
  };
  const styleCellCargo = {
    width: "33.33%",
    borderRight: "1px solid Black",
    margin: "-1px",
    textAlign: "center",
  };
  const styleCellPoint = {
    width: "80%",
    borderRight: "1px solid Black",
    margin: "-1px",
    textAlign: "left",
  };
  const styleCellDate = {
    width: "20%",
    borderRight: "1px solid Black",
    margin: "-1px",
    textAlign: "center",
  };
  return (
    <div style={{ margin: "5px 5px 5px 20px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%" }}>
          <img src={`${DOMENNAME}/img/track.png`} height="150" width="200" />
        </div>
        <div style={{ width: "75%" }}>
          <h1 style={{ textAlign: "center", margin: 0 }}>ИП Иванов С.Н.</h1>
          <p style={{ margin: 0, paddingLeft: "50px" }}>
            ИНН 615408271552 347323, г.Таганрог, ул.Ломакина д.108 кв.2
          </p>
          <p style={{ margin: 0, paddingLeft: "50px" }}>
            Фактический адрес 347324, г.Таганрог, ул.Москатова д.31/2 оф.34
          </p>
          <p style={{ margin: 0, paddingLeft: "50px" }}>
            телефон: +7-991-366-13-66 Вячеслав email: saver911@yandex.ru
          </p>
          <h3
            style={{ textAlign: "center" }}
          >{`ДОГОВОР-ЗАЯВКА НА  ПЕРЕВОЗКУ ГРУЗА № ${
            props.dataDoc.odersListId[props.id - 1]
          } от ${dateLocal(order.date)}`}</h3>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Заказчик</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            {client.companyName ? client.companyName : ""}
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Контактное лицо</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            {manager
              ? `${manager.name ? manager.name : ""} ${
                  manager.phone ? manager.phone : ""
                }`
              : ""}
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Наименование груза</span>
        </div>
        <div style={styleCellRight}>
          <div style={styleCellCargo}>
            <span style={{ paddingLeft: "5px" }}>Количество мест погрузки</span>
          </div>
          <div style={styleCellCargo}>
            <span style={{ paddingLeft: "5px" }}>
              Количество мест разгрузки
            </span>
          </div>
          <div style={styleCellCargo}>
            <span style={{ paddingLeft: "5px" }}>Вес, тонн</span>
          </div>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}></span>
        </div>
        <div style={styleCellRight}>
          <div style={styleCellCargo}>
            <span style={{ paddingLeft: "5px" }}>
              {order.idLoadingPoint.length}
            </span>
          </div>
          <div style={styleCellCargo}>
            <span style={{ paddingLeft: "5px" }}>
              {order.idUnloadingPoint.length}
            </span>
          </div>
          <div style={styleCellCargo}>
            <span style={{ paddingLeft: "5px" }}></span>
          </div>
        </div>
      </div>
      {order.idLoadingPoint.map((idCity, index) => {
        const point = citiesList.find((elem) => elem._id == idCity).value;
        const addInfo = order.loadingInfo[index];
        return (
          <React.Fragment key={`Loading${index}`}>
            <div style={styleDivRow}>
              <div style={styleCellLeft}>
                <span style={{ paddingLeft: "5px" }}>{`Адрес, дата загрузки ${
                  index + 1
                }`}</span>
              </div>
              <div style={styleCellRight}>
                <div style={styleCellPoint}>
                  <span style={{ paddingLeft: "5px" }}>
                    {`${point}, ${addInfo}`}
                  </span>
                </div>
                <div style={styleCellDate}>
                  <span style={{ paddingLeft: "5px" }}>{}</span>
                </div>
              </div>
            </div>
            <div style={styleDivRow}>
              <div style={styleCellLeft}>
                <span
                  style={{ paddingLeft: "5px" }}
                >{`Название организации`}</span>
              </div>
              <div style={styleCellRight}>
                <span style={{ paddingLeft: "5px" }}>По ТТН</span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {order.idUnloadingPoint.map((idCity, index) => {
        const point = citiesList.find((elem) => elem._id == idCity).value;
        const addInfo = order.unloadingInfo[index];
        return (
          <React.Fragment key={`unloading${index}`}>
            <div style={styleDivRow}>
              <div style={styleCellLeft}>
                <span style={{ paddingLeft: "5px" }}>{`Адрес, дата разгрузки ${
                  index + 1
                }`}</span>
              </div>
              <div style={styleCellRight}>
                <div style={styleCellPoint}>
                  <span style={{ paddingLeft: "5px" }}>
                    {`${point}, ${addInfo}`}
                  </span>
                </div>
                <div style={styleCellDate}>
                  <span style={{ paddingLeft: "5px" }}>{}</span>
                </div>
              </div>
            </div>
            <div style={styleDivRow}>
              <div style={styleCellLeft}>
                <span style={{ paddingLeft: "5px" }}>
                  {`Название организации`}
                </span>
              </div>
              <div style={styleCellRight}>
                <span style={{ paddingLeft: "5px" }}>По ТТН</span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
