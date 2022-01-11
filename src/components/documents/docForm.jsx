import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InvoiceForm } from "./invoiceForm.jsx";
import { ActForm } from "./actForm.jsx";
import { findValueBy_Id } from "../myLib/myLib.js";

import "./billsForm.sass";
import { addActToDoc, createNewInvoice } from "../../actions/documentAction.js";

export const DocForm = (props) => {
  const dispatch = useDispatch();

  const odersList = useSelector((state) => state.oderReducer.odersList);
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
  const [showActOfAcceptance, setShowActOfAcceptance] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [id, setId] = useState(null);
  const [currentApplication, setCurrentApplication] = useState(null);
  const handleClickClose = () => {
    props.handleClickClose();
  };
  const handleClickTab = (number, e, typeOfTab) => {
    setTabId(e.currentTarget.id);
    setId(number);
    if (typeOfTab == "invoice") {
      setShowInvoice(true);
      setShowActOfAcceptance(false);
      setShowApplication(false);
    }
    if (typeOfTab == "actOfAcceptance") {
      setShowInvoice(false);
      setShowActOfAcceptance(true);
      setShowApplication(false);
    }
    if (typeOfTab == "application") {
      setShowInvoice(false);
      setShowActOfAcceptance(false);
      setShowApplication(true);
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
      arrTabId.push(elem.id);
    }
    console.log(arrTabId);
    if (showInvoice) {
      let htmlDoc = document.querySelector(".invoicePrintForm");
      dispatch(
        createNewInvoice(
          htmlDoc.innerHTML,
          props.dataDoc.number,
          year,
          customer
        )
      );
      setTabId(arrTabId[1]);
      setShowInvoice(false);
      setShowActOfAcceptance(true);
      setShowApplication(false);
    }
    if (showActOfAcceptance) {
      let htmlDoc = document.querySelector(".actPrintForm");
      dispatch(
        addActToDoc(
          htmlDoc.innerHTML,
          props.dataDoc.number,
          year,
          customer,
          props.dataDoc.odersListId
        )
      );
      setTabId(arrTabId[2]);
      setId(1);
      setShowInvoice(false);
      setShowActOfAcceptance(false);
      setShowApplication(true);
      setCurrentApplication(2);
    }
    if (showApplication) {
      let htmlDoc = document.querySelector(".invoicePrintForm");
      console.log(htmlDoc);
      setId(currentApplication);
      setTabId(arrTabId[currentApplication + 1]);
      setCurrentApplication(currentApplication + 1);
    }
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
          id="Tab2"
          className={divStyleFn("Tab2")}
          onClick={(e) => {
            handleClickTab(props.dataDoc.number, e, "actOfAcceptance");
          }}
        >
          Акт
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
        <button className="docFormBtn" onClick={handleClickBtn}>
          {showInvoice && "Сохранить Счет"}
          {showActOfAcceptance && "Добавить Акт"}
          {showApplication && "Добавить Заявку"}
        </button>
      </div>
      <div>
        {showInvoice && (
          <InvoiceForm
            dataDoc={props.dataDoc}
            getNewNumber={props.getNewNumber}
          />
        )}
        {showActOfAcceptance && (
          <ActForm dataDoc={props.dataDoc} getNewNumber={props.getNewNumber} />
        )}
        {showApplication && (
          <h3>{`Заявка №${props.dataDoc.odersListId[id - 1]}`}</h3>
        )}
      </div>
    </div>
  );
};
