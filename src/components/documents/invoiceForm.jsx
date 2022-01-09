import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";
import { TrEditable } from "./trEditable.jsx";

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
  const sumOders = oders.reduce(
    (sum, elem) => sum + Number(elem.customerPrice),
    0
  );

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
      let end = strInvoiceNumber.indexOf(" от ", 7);
      let newNumber = strInvoiceNumber.slice(start, end);
      props.getNewNumber(newNumber);
    }
  };

  return (
    <div className="invoicePrintForm">
      <h5
        style={{
          width: "95%",
          margin: "20px auto 0 auto",
          textAlign: "center",
          fontSize: "11px",
        }}
      >
        Внимание! Оплата данного счета означает согласие с условиями поставки
        товара. Уведомление об оплате обязательно, в противном случае не
        гарантируется наличие товара на складе. Товар отпускается по факту
        прихода денег на р/с Поставщика, самовывозом, при наличии доверенности и
        паспорта.
      </h5>
      <h4
        style={{
          width: "95%",
          margin: "20px auto 0 auto",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        Образец заполнения платежного поручения
      </h4>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontSize: "12px",
        }}
      >
        <colgroup>
          <col width="5.7%"></col>
          <col width="5.7%"></col>
          <col width="22.9%"></col>
          <col width="22.8%"></col>
          <col width="8.6%"></col>
          <col width="1.1%"></col>
          <col width="5.6%"></col>
          <col width="11.4%"></col>
          <col width="14.3%"></col>
        </colgroup>
        <tbody>
          <tr style={{ lineHeight: "1" }}>
            <td style={{ border: "1px solid black" }} colSpan="3">
              ИНН 615408271552
            </td>
            <td style={{ border: "1px solid black" }} colSpan="2">
              КПП
            </td>
            <td
              style={{ border: "1px solid black", borderBottom: "none" }}
              colSpan="2"
            >
              Сч.№
            </td>
            <td style={{ border: "1px solid black" }} colSpan="2">
              40802810400000367485
            </td>
          </tr>
          <tr style={{ lineHeight: "1" }}>
            <td style={{ border: "1px solid black" }} colSpan="5">
              ИП Иванов Сергей Николаевич
              <br />
              <span
                style={{
                  fontSize: "10px",
                  paddingTop: "6px",
                  display: "inline-block",
                }}
              >
                Получатель
              </span>
            </td>
            <td
              style={{ border: "1px solid black", borderTop: "none" }}
              colSpan="2"
            ></td>
            <td
              style={{ border: "1px solid black", borderTop: "none" }}
              colSpan="2"
            ></td>
          </tr>
          <tr style={{ lineHeight: "1" }}>
            <td style={{ border: "1px solid black" }} colSpan="5" rowSpan="2">
              АО "ТИНЬКОФФ БАНК" 123060 Москва 1-й Волоколамский пр-д, д.10
              <br />
              <span
                style={{
                  fontSize: "10px",
                  paddingTop: "6px",
                  display: "inline-block",
                }}
              >
                Банк получателя
              </span>
            </td>
            <td style={{ border: "1px solid black" }} colSpan="2">
              БИК
            </td>
            <td
              style={{ border: "1px solid black", borderBottom: "none" }}
              colSpan="2"
            >
              044525974
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }} colSpan="2">
              Сч.№
            </td>
            <td
              style={{ border: "1px solid black", borderTop: "none" }}
              colSpan="2"
            >
              30101810145250000974
            </td>
          </tr>
          <tr>
            <td
              colSpan="9"
              onDoubleClick={handleDblClick}
              style={{ borderBottom: "2px solid black" }}
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
                <h2>{strInvoiceNumber}</h2>
              )}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "5px", verticalAlign: "top" }} colSpan="2">
              Поставщик
            </td>
            <td colSpan="7" style={{ padding: "5px", fontWeight: "700" }}>
              ИП Иванов Сергей Николаевич, свидетельство № 308615401700030 от
              17.01.08г. Ростовская область, Таганрог, Ломакина, д. 108, кв. 2{" "}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "5px", verticalAlign: "top" }} colSpan="2">
              Покупатель
            </td>
            <td colSpan="7" style={{ padding: "5px", fontWeight: "700" }}>
              {customer.companyName + " ИНН " + customer.TIN + ", "}
              <br /> {customer.address}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontSize: "12px",
          border: "2px solid black",
        }}
      >
        <colgroup>
          <col width="5.7%"></col>
          <col width="5.7%"></col>
          <col width="22.9%"></col>
          <col width="22.8%"></col>
          <col width="8.6%"></col>
          <col width="1.1%"></col>
          <col width="5.6%"></col>
          <col width="11.4%"></col>
          <col width="14.3%"></col>
        </colgroup>
        <thead>
          <tr
            style={{ lineHeight: 1.8, fontWeight: "700", textAlign: "center" }}
          >
            <td style={{ border: "1px solid black" }}>№</td>
            <td style={{ border: "1px solid black" }} colSpan="3">
              Товар
            </td>
            <td style={{ border: "1px solid black" }} colSpan="2">
              Кол-во
            </td>
            <td style={{ border: "1px solid black" }}>Ед.</td>
            <td style={{ border: "1px solid black" }}>Цена</td>
            <td style={{ border: "1px solid black" }}>Сумма</td>
          </tr>
        </thead>
        <tbody>
          {oders.map((elem, index) => {
            return (
              <TrEditable key={`str${elem._id}`} elem={elem} index={index} />
            );
          })}
        </tbody>
      </table>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}
      >
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
              {sumOders}
            </td>
          </tr>
          <tr>
            <td style={{ width: "80%" }}>
              Всего наименований 1, на сумму {sumOders} руб без НДС
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
        <img
          style={{
            position: "absolute",
            left: "300px",
            top: "-30px",
            opacity: "0.7",
            zIndex: "-2",
          }}
          height="120"
          width="120"
          src="http://localhost:3000/img/stamp.png"
        />
        <img
          style={{
            position: "absolute",
            left: "320px",
            top: "-45px",
            zIndex: "-1",
          }}
          height="120"
          width="120"
          src="http://localhost:3000/img/sign.png"
        />
      </div>
    </div>
  );
};
