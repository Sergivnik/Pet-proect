import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InvoiceForm } from "./invoiceForm.jsx";
import { ActForm } from "./actForm.jsx";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { InputText } from "../myLib/inputText.jsx";
import {
  createApp,
  createDocWithoutStamp,
  createNewInvoice,
} from "../../actions/documentAction.js";
import { AppForm } from "./appForm.jsx";

import "./billsForm.sass";

export const DocForm = (props) => {
  const dispatch = useDispatch();

  const odersList = useSelector((state) => state.oderReducer.originOdersList);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const oders = props.dataDoc.odersListId.map((id) =>
    odersList.find((elem) => elem._id == id)
  );
  const customer = findValueBy_Id(oders[0].idCustomer, clientList).value;

  const dateOfInvoice = oders.reduce((maxDate, elem) => {
    if (maxDate < new Date(elem.date)) {
      maxDate = new Date(elem.date);
    }
    return maxDate;
  }, new Date(oders[0].date));
  const year = dateOfInvoice.getFullYear();

  const [tabId, setTabId] = useState("Tab1");
  const [showInvoice, setShowInvoice] = useState(true);
  // const [showActOfAcceptance, setShowActOfAcceptance] = useState(false);
  const [showDocWithoutStamp, setShowDocWithoutStamp] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [id, setId] = useState(null);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [strObj, setStrObj] = useState([null]);
  const [addStrObj, setAddStrObj] = useState(null);
  const [showAddStr, setShowAddStr] = useState(false);
  const [addData, setAddData] = useState({
    wayBill: false,
    contract: false,
    aplication: false,
    trackTrailer: false,
    reason: false,
    wayBillNumber: "",
  });
  const [appData, setAppData] = useState({ stamp: true, date: false });
  const [showWayBill, setShowWayBill] = useState(false);
  const [appEditData, setAppEditData] = useState({});
  const [saveBtnName, setSaveBtnName] = useState("Сохранить Счет");

  const handleClickClose = () => {
    props.handleClickClose();
  };
  const handleClickTab = (number, e, typeOfTab) => {
    setTabId(e.currentTarget.id);
    setId(number);
    if (typeOfTab == "invoice") {
      setShowInvoice(true);
      setShowApplication(false);
      setShowDocWithoutStamp(false);
      setSaveBtnName("Сохранить Счет");
    }
    if (typeOfTab == "docWithoutStamp") {
      setShowInvoice(false);
      setShowApplication(false);
      setShowDocWithoutStamp(true);
      setSaveBtnName("Соранить без печати");
    }
    if (typeOfTab == "application") {
      setCurrentApplication(1);
      setShowInvoice(false);
      setShowApplication(true);
      setSaveBtnName("Добавить Заявку");
      setShowDocWithoutStamp(false);
    }
  };
  const divStyleFn = (id) => {
    if (id == tabId) {
      return "docFormTab docFormTabChecked";
    } else {
      return "docFormTab";
    }
  };

  const handleClickBtn = () => {
    let tabList = document.querySelector(".tabList").children;
    let arrTabId = [];
    for (let elem of tabList) {
      if (elem.id != "") arrTabId.push(elem.id);
    }
    console.log(arrTabId);
    if (showInvoice) {
      let htmlDoc = document.querySelector(".docWithStamp");
      dispatch(
        createNewInvoice(
          htmlDoc.innerHTML,
          props.dataDoc.number,
          year,
          customer,
          props.dataDoc.odersListId
        )
      );
      setTabId(arrTabId[1]);
      setShowInvoice(false);
      setShowApplication(false);
      setShowDocWithoutStamp(true);
      setSaveBtnName("Соранить без печати");
    }
    if (showDocWithoutStamp) {
      let htmlDoc = document.querySelector(".docWithoutStamp");
      dispatch(
        createDocWithoutStamp(
          htmlDoc.innerHTML,
          props.dataDoc.number,
          year,
          customer
        )
      );
      setTabId(arrTabId[2]);
      setId(1);
      setShowInvoice(false);
      setShowDocWithoutStamp(false);
      setShowApplication(true);
      setSaveBtnName("Добавить Заявку");
      setCurrentApplication(2);
    }
    if (showApplication) {
      let htmlDoc = document.querySelector(".applicationForm");
      console.log(
        `${props.dataDoc.odersListId[id - 1]} от ${dateLocal(
          appEditData.appDate
        )}`
      );
      let orderId = props.dataDoc.odersListId[id - 1];
      let order = odersList.find((elem) => elem._id == orderId);
      if (order.applicationNumber) {
        let check = confirm("Заявка уже привязана!! Заменить?");
        if (!check) return false;
      }
      dispatch(
        createApp(
          htmlDoc.innerHTML,
          props.dataDoc.odersListId[id - 1],
          year,
          customer,
          `${props.dataDoc.odersListId[id - 1]} от ${dateLocal(
            appEditData.appDate
          )}`
        )
      );
      if (currentApplication + 1 < arrTabId.length) {
        setId(currentApplication);
        setTabId(arrTabId[currentApplication + 1]);
        setCurrentApplication(currentApplication + 1);
      } else {
        setSaveBtnName("Готово");
      }
    }
  };
  const getStrText = (obj, index) => {
    console.log(obj, index);
    let arrObj = [...strObj];
    arrObj[index] = obj;
    setStrObj(arrObj);
  };
  const handleClickBtnAdd = () => {
    setShowAddStr(!showAddStr);
  };
  const getAddStr = (obj) => {
    setAddStrObj(obj);
  };
  const handleClickCheckBox = (e) => {
    let { ...obj } = addData;
    let objApp = { ...appData };
    console.log("hi");
    switch (e.currentTarget.name) {
      case "wayBill":
        obj.wayBill = !obj.wayBill;
        setShowWayBill(true);
        break;
      case "contract":
        obj.contract = !obj.contract;
        break;
      case "aplication":
        obj.aplication = !obj.aplication;
        break;
      case "trackTrailer":
        obj.trackTrailer = !obj.trackTrailer;
        break;
      case "stampApp":
        objApp.stamp = !objApp.stamp;
        setAppData(objApp);
        break;
      case "dateApp":
        objApp.date = !objApp.date;
        setAppData(objApp);
        break;
      case "reason":
        obj.reason = !obj.reason;
        setAppData(objApp);
        break;
      default:
        break;
    }
    setAddData(obj);
  };
  const getText = (name, text) => {
    let { ...obj } = addData;
    obj.wayBillNumber = text;
    setAddData(obj);
    setShowWayBill(false);
  };
  const getEditData = (editData) => {
    setAppEditData(editData);
  };

  return (
    <div className="docFormMainDiv">
      <header className="docFormHeader">
        <h4 className="docFormHeaderH4">Документы для печати</h4>
        <svg width="20px" height="20px" onClick={handleClickClose}>
          <rect
            x="5%"
            y="48.5%"
            width="90%"
            height="10%"
            transform="rotate(45)"
          />
          <rect
            x="5%"
            y="48.5%"
            width="90%"
            height="10%"
            transform="rotate(-45)"
          />
        </svg>
      </header>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>ТТН </span>
          <input
            type="checkbox"
            name="wayBill"
            checked={addData.wayBill}
            onChange={handleClickCheckBox}
          />
          {showWayBill ? (
            <>
              <span>№</span>
              <div style={{ width: "100px" }}>
                <InputText
                  name="wayBillNumber"
                  typeInput="text"
                  getText={getText}
                  text={addData.wayBillNumber}
                />
              </div>
            </>
          ) : (
            <span>{addData.wayBillNumber}</span>
          )}
          <span>&nbsp;&nbsp;&nbsp;&nbsp;Договор</span>
          <input
            type="checkbox"
            name="contract"
            checked={addData.contract}
            onChange={handleClickCheckBox}
          />
          <span>&nbsp;&nbsp;&nbsp;&nbsp;Заявка</span>
          <input
            type="checkbox"
            name="aplication"
            checked={addData.aplication}
            onChange={handleClickCheckBox}
          />
          <span>&nbsp;&nbsp;&nbsp;&nbsp;Прицеп</span>
          <input
            type="checkbox"
            name="trackTrailer"
            checked={addData.waytrackTrailerBill}
            onChange={handleClickCheckBox}
          />
          <span>&nbsp;&nbsp;&nbsp;&nbsp;Основание</span>
          <input
            type="checkbox"
            name="reason"
            checked={addData.reason}
            onChange={handleClickCheckBox}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>Печать</span>
          <input
            type="checkbox"
            name="stampApp"
            checked={appData.stamp}
            onChange={handleClickCheckBox}
          />
        </div>
      </div>
      <div className="tabList">
        <div
          id="Tab1"
          className={divStyleFn("Tab1")}
          onClick={(e) => {
            handleClickTab(props.dataDoc.number, e, "invoice");
          }}
        >
          Счет
        </div>
        <div
          id="Tab3"
          className={divStyleFn("Tab3")}
          onClick={(e) => {
            handleClickTab(props.dataDoc.number, e, "docWithoutStamp");
          }}
        >
          Счет без печати
        </div>
        {props.dataDoc.odersListId.map((elem, index) => {
          return (
            <div
              id={`Tab${elem}`}
              className={divStyleFn(`Tab${elem}`)}
              key={elem}
              onClick={(e) => {
                handleClickTab(index + 1, e, "application");
              }}
            >
              {`Заявка ${index + 1}`}
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="docFormBtnAdd" onClick={handleClickBtnAdd}>
            {showAddStr ? "Удалить строку" : "Добавить строку"}
          </button>
          <button className="docFormBtn" onClick={handleClickBtn}>
            {saveBtnName}
          </button>
        </div>
      </div>
      <div className="docPrintDiv">
        {showInvoice && (
          <div className="docWithStamp">
            <InvoiceForm
              dataDoc={props.dataDoc}
              getNewNumber={props.getNewNumber}
              stamp={true}
              getStrText={getStrText}
              strObj={strObj}
              showAddStr={showAddStr}
              getAddStr={getAddStr}
              addStrObj={addStrObj}
              addData={addData}
            />
            <ActForm
              dataDoc={props.dataDoc}
              getNewNumber={props.getNewNumber}
              stamp={true}
              getStrText={getStrText}
              strObj={strObj}
              showAddStr={showAddStr}
              getAddStr={getAddStr}
              addStrObj={addStrObj}
              addData={addData}
            />
          </div>
        )}

        {showDocWithoutStamp && (
          <div className="docWithoutStamp">
            <InvoiceForm
              dataDoc={props.dataDoc}
              getNewNumber={props.getNewNumber}
              stamp={false}
              getStrText={getStrText}
              strObj={strObj}
              showAddStr={showAddStr}
              getAddStr={getAddStr}
              addStrObj={addStrObj}
              addData={addData}
            />
            <ActForm
              dataDoc={props.dataDoc}
              getNewNumber={props.getNewNumber}
              stamp={false}
              getStrText={getStrText}
              strObj={strObj}
              showAddStr={showAddStr}
              getAddStr={getAddStr}
              addStrObj={addStrObj}
              addData={addData}
            />
            <ActForm
              dataDoc={props.dataDoc}
              getNewNumber={props.getNewNumber}
              stamp={false}
              getStrText={getStrText}
              strObj={strObj}
              showAddStr={showAddStr}
              getAddStr={getAddStr}
              addStrObj={addStrObj}
              addData={addData}
            />
          </div>
        )}
        {showApplication && (
          <div className="applicationForm">
            <AppForm
              dataDoc={props.dataDoc}
              id={id}
              stamp={appData.stamp}
              getEditData={getEditData}
              driverApp={false}
              //currentDate={appData.date}
            />
          </div>
        )}
      </div>
    </div>
  );
};
