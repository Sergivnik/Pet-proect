import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPdfDoc } from "../../actions/documentAction.js";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";
import "./printFormBill.sass";

export const PrintFormBill = (props) => {
  const dispatch = useDispatch();
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const citiesList = useSelector((state) => state.oderReducer.citieslist);
  const driver = useSelector((state) => state.oderReducer.trackdrivers);
  const track = useSelector((state) => state.oderReducer.tracklist);
  const elem = props.elem;
  const customer = findValueBy_Id(elem.idCustomer, clientList);
  const route = elem.idLoadingPoint.concat(elem.idUnloadingPoint);
  let routeText = "";
  route.forEach((element) => {
    let city = findValueBy_Id(element, citiesList).value;
    routeText = routeText + " - " + city;
  });
  routeText = routeText.slice(2);
  const driverText = findValueBy_Id(elem.idTrackDriver, driver).name;
  const trackObj = findValueBy_Id(elem.idTrack, track);
  const styleContainer = {
    padding: "20px",
  };
  const styleH5 = {
    width: "95%",
    margin: "20px auto 0 auto",
    textAlign: "center",
  };
  const styleTable = {
    borderCollapse: "collapse",
    width: "100%",
    margin: "20px auto 0 auto",
  };
  const styleTd = {
    border: "1px solid black",
    verticalAlign: "top",
  };
  const styleTd1 = {
    border: "1px solid black",
    verticalAlign: "top",
    width: "34%",
  };
  const styleTd2 = {
    border: "1px solid black",
    verticalAlign: "top",
    width: "34%",
  };
  const styleTd3 = {
    border: "1px solid black",
    verticalAlign: "top",
    width: "7.5%",
  };
  const styleTd4 = {
    border: "1px solid black",
    verticalAlign: "top",
    width: "25%",
  };
  const styleSpan = {
    fontSize: "12px",
    paddingTop: "10px",
    display: "inline-block",
  };
  const borerTopNone = {
    border: "1px solid black",
    verticalAlign: "top",
    borderTop: "none",
  };
  const borderBottomNone = {
    border: "1px solid black",
    verticalAlign: "top",
    borderBottom: "none",
  };

  const handleClickSave = () => {
    let printDoc = document.querySelector(".printForm");
    dispatch(addPdfDoc(printDoc.innerHTML, props.elem._id));
    console.log(printDoc);
    props.closePrintForm();
  };
  return (
    <div className="mainDiv">
      <button onClick={handleClickSave}>Сохранить</button>
      <div className="printForm">
        <div style={styleContainer}>
          <h5 style={styleH5}>
            Внимание! Оплата данного счета означает согласие с условиями
            поставки товара. Уведомление об оплате обязательно, в противном
            случае не гарантируется наличие товара на складе. Товар отпускается
            по факту прихода денег на р/с Поставщика, самовывозом, при наличии
            доверенности и паспорта.
          </h5>
          <h4 style={styleH5}>Образец заполнения платежного поручения</h4>
          <table style={styleTable}>
            <tbody>
              <tr>
                <td style={styleTd1}>ИНН 615408271552</td>
                <td style={styleTd2}>КПП</td>
                <td rowSpan="2" style={styleTd3}>
                  Сч.№
                </td>
                <td rowSpan="2" style={styleTd4}>
                  <span>40802810400000367485</span>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={styleTd1}>
                  ИП Иванов Сергей Николаевич
                  <br />
                  <span style={styleSpan}>Получатель</span>
                </td>
              </tr>
              <tr>
                <td colSpan="2" rowSpan="2" style={styleTd1}>
                  АО "ТИНЬКОФФ БАНК" 123060 Москва 1-й Волоколамский пр-д, д.10
                  <br />
                  <span style={styleSpan}>Банк получателя</span>
                </td>
                <td style={styleTd3}>БИК</td>
                <td style={borderBottomNone}>044525974</td>
              </tr>
              <tr>
                <td style={styleTd3}>Сч.№</td>
                <td style={borerTopNone}>30101810145250000974</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ borderBottom: "2px solid black" }}>
                  <h2 style={{ margin: "20px" }}>
                    Счет № {elem.accountNumber} от {dateLocal(elem.date)}
                  </h2>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td style={{ margin: "5px", verticalAlign: "top" }}>
                  Поставщик
                </td>
                <td colSpan="3" style={{ margin: "5px", fontWeight: "700" }}>
                  ИП Иванов Сергей Николаевич, свидетельство № 308615401700030
                  от 17.01.08г. Ростовская область, Таганрог, Ломакина, д. 108,
                  кв. 2
                </td>
              </tr>
              <tr>
                <td style={{ margin: "5px", verticalAlign: "top" }}>
                  Покупатель
                </td>
                <td colSpan="3" style={{ margin: "5px", fontWeight: "700" }}>
                  {customer.companyName + ", ИНН " + customer.TIN + ", "}
                  <br /> {customer.address}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              border: "2px solid black",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  №
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Наименование работы (услуги)
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Кол-во
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Ед.
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Цена
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Сумма
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  1
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "left",
                    padding: "5px",
                  }}
                >
                  Перевозка по маршруту {routeText} водитель {driverText} а/м{" "}
                  {trackObj.model} {trackObj.value}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  1
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  рейс
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  {elem.customerPrice}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  {elem.customerPrice}
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    width: "90%",
                    margin: "5px",
                    textAlign: "right",
                    fontWeight: "700",
                  }}
                >
                  Итого:
                </td>
                <td
                  style={{
                    width: "10%",
                    margin: "5px",
                    textAlign: "right",
                    fontWeight: "700",
                  }}
                >
                  {elem.customerPrice}
                </td>
              </tr>
              <tr>
                <td style={{ width: "80%" }}>
                  Всего наименований 1, на сумму {elem.customerPrice} руб без
                  НДС
                </td>
              </tr>
              <tr style={{ borderBottom: "2px solid black" }}>
                <td style={{ width: "80%", fontWeight: "700" }}>
                  {"(" + sumInWords(elem.customerPrice) + " )"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
