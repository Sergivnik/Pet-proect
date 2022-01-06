import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";
import { TrEditable } from "./trEditable.jsx";

import "./billsForm.sass";

export const ActForm = (props) => {
  const odersList = useSelector((state) => state.oderReducer.odersList);
  const clientList = useSelector((state) => state.oderReducer.clientList);

  const oders = props.dataDoc.odersListId.map((id) =>
    odersList.find((elem) => elem._id == id)
  );
  const dateOfAct = oders.reduce((maxDate, elem) => {
    if (maxDate < new Date(elem.date)) {
      maxDate = elem.date;
    }
    return maxDate;
  }, new Date(oders[0].date));
  const [strInvoiceNumber, setStrInvoiceNumber] = useState(
    `Акт № ${props.dataDoc.number} от ${dateLocal(dateOfAct)}`
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
    if (e.keyCode == 13) setShowInput(false);
  };
  return (
    <div>
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
          <tr>
            <td style={{ width: "80%", fontWeight: "700" }}>
              {"(" + sumInWords(sumOders) + " )"}
            </td>
          </tr>
          <tr>
            <td
              style={{ width: "80%", fontStyle: "italic", padding: "10px 0" }}
            >
              {"Всего оказано услуг на сумму: " +
                sumInWords(sumOders) +
                " без НДС"}
            </td>
          </tr>
          <tr>
            <td style={{ width: "100%" }} colSpan="2">
              {
                "Вышеперечисленные услуги выполнены полностью и в срок. Заказчик претензий по объему, качеству и срокам оказания услуг не имеет"
              }
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ position: "relative", height: "100px" }}>
        <p style={{ marginTop: "50px", fontSize: "12px" }}>
          Исполнитель{" "}
          <span style={{ textDecoration: "underline" }}>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Иванов
            С.Н.&emsp;&emsp;
          </span>
          &emsp;&emsp;Заказчик{" "}
          <span style={{ textDecoration: "underline" }}>
            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;
          </span>{" "}
        </p>
        <img
          style={{
            position: "absolute",
            left: "60px",
            top: "-50px",
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
            left: "70px",
            top: "-55px",
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
