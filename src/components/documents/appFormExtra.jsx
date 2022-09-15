import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppForm } from "./appForm.jsx";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { createApp } from "../../actions/documentAction.js";
import "./billsForm.sass";

export const AppFormExtra = (props) => {
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.oderReducer.originOdersList);
  const clientList = useSelector((state) => state.oderReducer.clientList);

  const order = findValueBy_Id(props.id, ordersList);
  const customer = findValueBy_Id(order.idCustomer, clientList).value;
  const orderDate = new Date(order.date);
  const year = orderDate.getFullYear();

  const [stamp, setStamp] = useState(true);
  const [driverApp, setDriverApp] = useState(false);
  const [appEditData, setAppEditData] = useState({});

  const getEditData = (editData) => {
    setAppEditData(editData);
  };
  const handleClickStamp = () => {
    setStamp(!stamp);
  };
  const handleClickDriverApp = () => {
    setDriverApp(!driverApp);
  };
  const handleSave = () => {
    console.log(props.id, year, customer);
    let htmlDoc = document.querySelector(".applicationForm");
    dispatch(
      createApp(
        htmlDoc.innerHTML,
        props.id,
        year,
        customer,
        `${props.id} от ${dateLocal(appEditData.appDate)}`
      )
    );
  };
  return (
    <div className="appFormExtraContaiter">
      <header className="appFormExtraHeader">
        <label className="appFormExtraLabel">
          <span className="appFormExtraSpan">Печать</span>
          <input type="checkBox" onChange={handleClickStamp} checked={stamp} />
        </label>
        <label className="appFormExtraLabel">
          <span className="appFormExtraSpan">Заявка Перевозчику</span>
          <input
            type="checkBox"
            onChange={handleClickDriverApp}
            checked={driverApp}
          />
        </label>
        <button className="appFormExtraBtn" onClick={handleSave}>
          Сохранить
        </button>
      </header>
      <main className="appFormExtraMain">
        <div className="applicationForm">
          <AppForm
            dataDoc={{ number: null, odersListId: [props.id] }}
            id={1}
            stamp={stamp}
            getEditData={getEditData}
            driverApp={driverApp}
            //currentDate={appData.date}
          />
        </div>
      </main>
    </div>
  );
};
