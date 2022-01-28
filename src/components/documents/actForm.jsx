import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateLocal, findValueBy_Id, sumInWords } from "../myLib/myLib.js";
import { TrEditable } from "./trEditable.jsx";
import { DOMENNAME } from "../../middlewares/initialState.js";

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
    <div className="actPrintForm">
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
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "14px",
          }}
        >
          <tbody>
            <tr>
              <td
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
          </tbody>
        </table>
        <div style={{ fontSize: "14px" }}>
          <div style={{ height: "45px" }}>
            <div
              style={{
                padding: "5px",
                verticalAlign: "top",
                float: "left",
                display: "inline-block",
                width: "12%",
              }}
            >
              Исполнитель:
            </div>
            <div
              style={{
                padding: "5px",
                fontWeight: "700",
                float: "right",
                display: "inline-block",
                width: "85%",
              }}
            >
              ИП Иванов Сергей Николаевич, свидетельство № 308615401700030 от
              17.01.08г. Ростовская область, Таганрог, Ломакина, д. 108, кв. 2{" "}
            </div>
          </div>
          <div>
            <div
              style={{
                padding: "5px",
                verticalAlign: "top",
                float: "left",
                display: "inline-block",
                width: "12%",
              }}
            >
              Заказчик:
            </div>
            <div
              style={{
                padding: "5px",
                fontWeight: "700",
                float: "right",
                display: "inline-block",
                width: "85%",
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
                <TrEditable key={`str${elem._id}`} elem={elem} index={index} />
              );
            })}
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
                {sumOders}
              </td>
            </tr>
            <tr>
              <td style={{ width: "80%" }}>
                Всего наименований {oders.length}, на сумму {sumOders} руб без
                НДС
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
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              Иванов С.Н.&emsp;&emsp;
            </span>
            &emsp;&emsp;Заказчик{" "}
            <span style={{ textDecoration: "underline" }}>
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              &emsp;&emsp;
            </span>{" "}
          </p>
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
        </div>
      </div>
    </div>
  );
};
