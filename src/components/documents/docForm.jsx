import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./billsForm.sass";

export const DocForm = (props) => {
  const [tabId, setTabId] = useState("Tab1");
  const [showInvoice, setShowInvoice] = useState(false);
  const [showActOfAcceptance, setShowActOfAcceptance] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [id, setId] = useState(null);
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
      <div className="docFormDivHeader">
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
      </div>
      <div className="docFormDivContent">
        {showInvoice && <h3>{`Счет №${id}`}</h3>}
        {showActOfAcceptance && <h3>{`Акт №${id}`}</h3>}
        {showApplication && (
          <h3>{`Заявка №${props.dataDoc.odersListId[id - 1]}`}</h3>
        )}
      </div>
    </div>
  );
};
