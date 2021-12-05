import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPdfDoc } from "../../actions/documentAction.js";
import { dateLocal, findValueBy_Id } from "../myLib/myLib.js";
import "./printFormBill.sass";

export const PrintFormBill = (props) => {
  const dispatch = useDispatch();
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const elem = props.elem;
  const customer = findValueBy_Id(elem.idCustomer, clientList);
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
                  <h2>
                    Счет № {elem.accountNumber} от {dateLocal(elem.date)}
                  </h2>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div style={{ display: "flex" }}>
                    <div style={{ margin: "5px" }}>Поставщик</div>
                    <div style={{ margin: "5px", fontWeight: "700" }}>
                      ИП Иванов Сергей Николаевич, свидетельство №
                      308615401700030 от 17.01.08г. Ростовская область,
                      Таганрог, Ломакина, д. 108, кв. 2
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  <div style={{ display: "flex" }}>
                    <div style={{ margin: "5px" }}>Покупатель</div>
                    <div style={{ margin: "5px", fontWeight: "700" }}>
                      {customer.companyName +
                        " ИНН " +
                        customer.TIN +
                        " " +
                        customer.address}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
