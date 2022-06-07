import React, { useState } from "react";
import { useSelector } from "react-redux";
import { dateLocal, sumInWords } from "../myLib/myLib";
import { DOMENNAME } from "../../middlewares/initialState.js";

import "./billsForm.sass";

export const AppForm = (props) => {
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const managerList = useSelector((state) => state.oderReducer.clientmanager);
  const citiesList = useSelector((state) => state.oderReducer.citieslist);
  const tracksList = useSelector((state) => state.oderReducer.tracklist);
  const trackDriversList = useSelector(
    (state) => state.oderReducer.trackdrivers
  );

  const order = odersList.find(
    (elem) => elem._id == props.dataDoc.odersListId[props.id - 1]
  );
  const client = clientList.find((elem) => elem._id == order.idCustomer);
  const manager = order.idManager
    ? managerList.find((elem) => elem._id == order.idManager)
    : null;
  const track = order.idTrack
    ? tracksList.find((elem) => elem._id == order.idTrack)
    : null;
  const trackDriver = order.idTrackDriver
    ? trackDriversList.find((elem) => elem._id == order.idTrackDriver)
    : null;

  const styleDivRow = { display: "flex", marginBottom: "-1px" };
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
  const styleDiv50 = { width: "50%" };
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
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Стоимость перевозки</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            {order.customerPrice
              ? `${order.customerPrice} (${sumInWords(order.customerPrice)})`
              : ""}
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Форма оплаты</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            Безналичный расчет по счету без НДС
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Ставка простоя</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}></span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Дополнительные условия</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}></span>
        </div>
      </div>
      <div>
        <p style={{ margin: 0 }}>ПРОЧИЕ УСЛОВИЯ:</p>
        <p style={{ margin: 0 }}>
          1.1. В своей деятельности стороны руководствуются положениями
          настоящего договора-заявки.
        </p>
        <p style={{ margin: 0 }}>
          1.2. Заказчик обеспечивает загрузку/разгрузу автотранспортного
          средства в течении 4 часов с момента прибытия транспорта. Свыше
          указанного времени простой автомобиля оплачивается исходя из ставки
          простоя указанной в заявке.
        </p>
        <p style={{ margin: 0 }}>
          1.3. Перевозчик несет ответственность перед Заказчиком в виде
          возмещения реального ущерба за утрату недостачу или порчу груза,
          принятого для перевозки,если не докажет, что утрата, недостача или
          повреждение (порча) груза произошли вследствие обстоятельств, которые
          перевозчик не мог предотвратить или устранить по независящим от него
          причинам.
        </p>
        <p style={{ margin: 0 }}>1.4. Заказчик несет ответственность:</p>
        <p style={{ margin: 0 }}>
          {" "}
          1.4.1. За срыв перевозки по договору-заявке: 20% от стоимости
          перевозки
        </p>
        <p style={{ margin: 0 }}>
          {" "}
          1.4.2. За несвоевременную (согласно договора) оплату за выполненную
          перевозку : 0,1% от суммы просроченного платежа за каждый день
          просрочки с момента предъявления письменной претензии
        </p>
        <p style={{ margin: 0 }}>
          1.5. Стороны могут отказываться от выполнения обязательств по
          утвержденной (подписанной) ими заявке без несения материальной
          ответственности не позденее 24 часов до загрузки
        </p>
        <p style={{ margin: 0 }}>
          1.6. Копия заявки считается действительной и имеет юридическую силу.
        </p>
        <p style={{ margin: 0 }}>
          1.7. В случае перегруза транспортного средства Заказчик компенсирует
          Перевозчику, расходы по по уплате штрафов по пути следовани
          автомобиля.
        </p>
        <p style={{ margin: 0 }}>
          ПРОСИМ ПОДТВЕРДИТЬ ПРИНЯТИЕ ЗАЯВКИ ПЕЧАТЬЮ И ПОДПИСЬЮ
        </p>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>МАРКА, № А/М, № П/П</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            {`${track.model} ${track.value}        прицеп ${track.trackTrailerLicensePlate}`}
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>ФИО водителя</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>{`${trackDriver.name}`}</span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Паспортные данные</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            {`${trackDriver.passportNumber} ${trackDriver.department} выдан ${trackDriver.dateOfIssue}`}
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Водительское удостоверение</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            {`${trackDriver.driverLicense}`}
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleCellLeft}>
          <span style={{ paddingLeft: "5px" }}>Тел. водителя</span>
        </div>
        <div style={styleCellRight}>
          <span style={{ paddingLeft: "5px" }}>
            {`${trackDriver.phoneNumber}`}
          </span>
        </div>
      </div>
      <div style={styleDivRow}>
        <div style={styleDiv50}>
          <h4>Исполнитель</h4>
          <p style={{ height: "75px" }}>
            ИП Иванов С.Н. 347923, г. Таганрог Ростовская область, ул.Ломакина
            д.108 кв. 2, ИНН 615408271552
          </p>
          <p style={{ marginTop: "50px" }}>
            Подпись ______________________Иванов С.Н.
          </p>
          {props.stamp && (
            <img
              style={{
                position: "absolute",
                left: "60px",
                top: "-70px",
                opacity: "0.7",
                zIndex: "-2",
              }}
              height="170"
              width="170"
              src={`${DOMENNAME}/img/stamp.png`}
            />
          )}
          {props.stamp && (
            <img
              style={{
                position: "absolute",
                left: "90px",
                top: "-75px",
                zIndex: "-1",
                transform: "rotate(15deg)",
              }}
              height="120"
              width="120"
              src={`${DOMENNAME}/img/sign.png`}
            />
          )}
        </div>
        <div style={styleDiv50}>
          <h4>Заказчик</h4>
          <p style={{ height: "75px" }}>{`${client.companyName} ИНН ${
            client.TIN ? client.TIN : ""
          }, ${client.address ? client.address : ""}`}</p>
          <p style={{ marginTop: "50px" }}>Подпись ______________________</p>
        </div>
      </div>
    </div>
  );
};
