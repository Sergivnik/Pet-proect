import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";
import { TrEditable } from "./trEditable.jsx";
import { DOMENNAME } from "../../middlewares/initialState.js";
import { AddTr } from "./addTr.jsx";

import "./billsForm.sass";

export const InvoiceForm = (props) => {
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const clientList = useSelector((state) => state.oderReducer.clientList);

  const oders = props.dataDoc.odersListId.map((id) =>
    odersList.find((elem) => elem._id == id)
  );
  const dateOfInvoice = oders.reduce((maxDate, elem) => {
    if (maxDate < new Date(elem.date)) {
      maxDate = elem.date;
    }
    return maxDate;
  }, new Date(oders[0].date));

  const [strInvoiceNumber, setStrInvoiceNumber] = useState(
    `Счет № ${props.dataDoc.number} от ${dateLocal(dateOfInvoice)}`
  );
  const [showInput, setShowInput] = useState(false);

  const customer = findValueBy_Id(oders[0].idCustomer, clientList);
  let sumOders = oders.reduce(
    (sum, elem) => sum + Number(elem.customerPrice),
    0
  );
  if (sumOders - Math.floor(sumOders) == 0) {
    sumOders = sumOders + ".00";
  } else {
    sumOders = Math.floor(sumOders * 100) / 100;
  }
  const [sumOrders, setSumOrder] = useState(sumOders);

  const handleDblClick = () => {
    setShowInput(true);
  };
  const handleChange = (e) => {
    setStrInvoiceNumber(e.currentTarget.value);
  };
  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      setShowInput(false);
      let start = strInvoiceNumber.indexOf("№") + 1;
      if (strInvoiceNumber[start] == " ") start = start + 1;
      let end = strInvoiceNumber.indexOf(" от ", 7);
      let newNumber = strInvoiceNumber.slice(start, end);
      props.getNewNumber(newNumber);
    }
  };
  useEffect(() => {
    if (props.addStrObj != null) {
      setSumOrder(
        Number(sumOrders) +
          props.addStrObj.numberServices * props.addStrObj.unitPrice
      );
    }
  }, [props.addStrObj]);

  return (
    <div className="invoicePrintForm" style={{ pageBreakAfter: "always" }}>
      <div
        style={{
          width: "88%",
          display: "block",
          minHeight: "500px",
          padding: "4% 4% 0% 8%",
          marginTop: "19px",
          fontFamily: "arial",
        }}
      >
        <h5
          style={{
            width: "95%",
            margin: "0 auto",
            textAlign: "center",
            fontSize: "11px",
            lineHeight: "1",
            fontWeight: 300,
          }}
        >
          Внимание! Оплата данного счета означает согласие с условиями поставки
          товара. Уведомление об оплате
          <br />
          обязательно, в противном случае не гарантируется наличие товара на
          складе. Товар отпускается по факту
          <br />
          прихода денег на р/с Поставщика, самовывозом, при наличии доверенности
          и паспорта.
        </h5>
        <h4
          style={{
            width: "95%",
            margin: "20px auto 0 auto",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Образец заполнения платежного поручения
        </h4>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "14px",
          }}
        >
          <tbody>
            <tr style={{ lineHeight: "1" }}>
              <td style={{ border: "1px solid black", width: "34.3%" }}>
                ИНН 615408271552
              </td>
              <td style={{ border: "1px solid black", width: "31.3%" }}>КПП</td>
              <td
                style={{
                  border: "1px solid black",
                  borderBottom: "none",
                  width: "6.7%",
                }}
              >
                Сч.№
              </td>
              <td style={{ border: "1px solid black", width: "25.7%" }}>
                40802810400000367485
              </td>
            </tr>
            <tr style={{ lineHeight: "1" }}>
              <td style={{ border: "1px solid black" }} colSpan={2}>
                ИП Иванов Сергей Николаевич
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    paddingTop: "6px",
                    display: "inline-block",
                  }}
                >
                  Получатель
                </span>
              </td>
              <td style={{ border: "1px solid black", borderTop: "none" }}></td>
              <td style={{ border: "1px solid black", borderTop: "none" }}></td>
            </tr>
            <tr style={{ lineHeight: "1" }}>
              <td style={{ border: "1px solid black" }} rowSpan="2" colSpan={2}>
                АО "ТИНЬКОФФ БАНК" 123060 Москва 1-й Волоколамский пр-д,д.10
                <br />
                <span
                  style={{
                    fontSize: "12px",
                    paddingTop: "6px",
                    display: "inline-block",
                  }}
                >
                  Банк получателя
                </span>
              </td>
              <td style={{ border: "1px solid black" }}>БИК</td>
              <td style={{ border: "1px solid black", borderBottom: "none" }}>
                044525974
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black" }}>Сч.№</td>
              <td style={{ border: "1px solid black", borderTop: "none" }}>
                30101810145250000974
              </td>
            </tr>
          </tbody>
        </table>
        <div /*style={{pageBreakAfter:"always"}}*/>
          <div
            onDoubleClick={handleDblClick}
            style={{ borderBottom: "2px solid black", fontSize: "16px" }}
          >
            {showInput ? (
              <input
                type="text"
                className="billsFormNumberInput"
                value={strInvoiceNumber}
                onChange={handleChange}
                onKeyDown={handleEnter}
              />
            ) : (
              <h4
                style={{
                  fontWeight: 700,
                  margin: "17px 0 17px 0",
                  fontSize: "18px",
                }}
              >
                {strInvoiceNumber}
              </h4>
            )}
          </div>
        </div>
        <div style={{ fontSize: "14px" }}>
          <div style={{ height: "60px" }}>
            <div
              style={{
                padding: "5px",
                verticalAlign: "top",
                float: "left",
                display: "inline-block",
                width: "10%",
              }}
            >
              Поставщик:
            </div>
            <div
              style={{
                padding: "5px",
                fontWeight: "700",
                float: "right",
                display: "inline-block",
                width: "86%",
              }}
            >
              ИП Иванов Сергей Николаевич, ИНН 615408271552, свидетельство № 308615401700030 от
              17.01.08г. Ростовская область, 347923, Таганрог, Ломакина, д. 108,
              кв. 2{" "}
            </div>
          </div>
          <div>
            <div
              style={{
                padding: "5px",
                verticalAlign: "top",
                float: "left",
                display: "inline-block",
                width: "10%",
              }}
            >
              Покупатель:
            </div>
            <div
              style={{
                padding: "5px",
                fontWeight: "700",
                float: "right",
                display: "inline-block",
                width: "86%",
              }}
            >
              {customer.companyName + " ИНН " + customer.TIN + ", "}
              <br /> {customer.address}
            </div>
          </div>
        </div>

        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "12px",
            border: "2px solid black",
          }}
        >
          <thead>
            <tr
              style={{
                lineHeight: 1.8,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              <td style={{ border: "1px solid black", width: "5.7%" }}>№</td>
              <td style={{ border: "1px solid black", width: "51.3%" }}>
                Наимениование работы (услуги)
              </td>
              <td style={{ border: "1px solid black", width: "9.7%" }}>
                Кол-во
              </td>
              <td style={{ border: "1px solid black", width: "5.6%" }}>Ед.</td>
              <td style={{ border: "1px solid black", width: "11.4%" }}>
                Цена
              </td>
              <td style={{ border: "1px solid black", width: "14.3%" }}>
                Сумма
              </td>
            </tr>
          </thead>
          <tbody>
            {oders.map((elem, index) => {
              return (
                <TrEditable
                  key={`str${elem._id}`}
                  elem={elem}
                  index={index}
                  getStrText={props.getStrText}
                  strObj={props.strObj[index]}
                  addData={props.addData}
                />
              );
            })}
            {props.showAddStr && (
              <AddTr
                numberStr={oders.length + 1}
                getAddStr={props.getAddStr}
                addStrObj={props.addStrObj}
              />
            )}
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "84%",
                  margin: "5px",
                  textAlign: "right",
                  fontWeight: "700",
                }}
              >
                Итого:
              </td>
              <td
                style={{
                  width: "14%",
                  margin: "5px",
                  paddingRight: "10px",
                  textAlign: "right",
                  fontWeight: "700",
                }}
              >
                {sumOrders}
              </td>
            </tr>
            <tr>
              <td style={{ width: "80%" }}>
                Всего наименований {oders.length}, на сумму {sumOrders} руб без
                НДС
              </td>
            </tr>
            <tr style={{ borderBottom: "2px solid black" }}>
              <td style={{ width: "80%", fontWeight: "700" }}>
                {"(" + sumInWords(sumOders) + " )"}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ position: "relative", height: "100px" }}>
          <p style={{ marginTop: "50px" }}>
            Индивидуальный предпрениматель _____________________________Иванов
            С.Н.
          </p>
          {props.stamp && (
            <img
              style={{
                position: "absolute",
                left: "300px",
                top: "-65px",
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
                left: "330px",
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
      </div>
    </div>
  );
};
