import React, { useState } from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import "./driverForms.sass";

export const DriverDebtCreate = (props) => {
  let now = new Date();
  const DateStr = (date) => {
    date = new Date(date);
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  };
  const DateLocal = (date) => {
    if (date != null) {
      date = new Date(date);
      return date.toLocaleDateString();
    }
  };
  const [dateOfPayment, setDateOfPayment] = useState(DateStr(now));
  const [showCreateDate, setShowCreateDate] = useState(false);
  const [showCreateDriver, setShowCreateDriver] = useState(false);
  const [debtData, setDebtData] = useState({
    date: null,
    idDriver: null,
    category: null,
    sumOfDebt: 0,
    debtClosed: "Нет",
    addInfo: "",
  });

  const handleGetFocus = (e) => {
    setShowCreateDate(true);
  };
  const handleGetDate = (e) => {
    let objData = debtData;
    setDateOfPayment(e.target.value);
    objData.date = e.target.value;
    setDebtData(objData);
  };
  const handleLostFocus = (e) => {
    setShowCreateDate(false);
    setShowCreateDriver(true);
  };
  const handleClickTdDriver = () => {
    setShowCreateDriver(true);
  };
  return (
    <tr className="driverDebtCreateTr">
      <td className="driverDebtCreateTd" onClick={handleGetFocus}>
        {showCreateDate ? (
          <input
            className="driveDebtCreateInput"
            type="date"
            value={dateOfPayment}
            onBlur={handleGetFocus}
            onChange={handleGetDate}
            onBlur={handleLostFocus}
          />
        ) : (
          DateLocal(debtData.date)
        )}
      </td>
      <td className="driverDebtCreateTd" onClick={handleClickTdDriver}>
        {showCreateDriver ? (
          <div className="driverDebtCreateChoise">
            <ChoiseList
              name="driver"
              arrlist={props.driversList}
              setValue={props.setValue}
            />
          </div>
        ) : (
          debtData.idDriver
        )}
      </td>
      <td className="driverDebtCreateTd"></td>
      <td className="driverDebtCreateTd"></td>
      <td className="driverDebtCreateTd"></td>
      <td className="driverDebtCreateTd"></td>
    </tr>
  );
};
