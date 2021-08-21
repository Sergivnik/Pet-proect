import React, { useEffect, useState } from "react";
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
  const categoryList = props.categoryList;

  const [dateOfPayment, setDateOfPayment] = useState(DateStr(now));
  const [showCreateDate, setShowCreateDate] = useState(false);
  const [showCreateDriver, setShowCreateDriver] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateSum, setShowCreateSum] = useState(false);
  const [showCreateAddInfo, setShowCreateAddInfo] = useState(false);
  const [showCreateDebtStatus, setShowCreateStatus] = useState(false);
  const [debtData, setDebtData] = useState({
    date: null,
    idDriver: null,
    driverValue: "",
    idCategory: null,
    categoryValue: "",
    sumOfDebt: null,
    idDebtClosed: null,
    debtClosedValue: null,
    addInfo: "",
  });

  useEffect(() => {
    if (
      showCreateDriver ||
      showCreateCategory ||
      showCreateSum ||
      showCreateAddInfo ||
      showCreateDebtStatus
    ) {
      let dirOfChoise = document.querySelector(".driverDebtCreateChoise");
      let input = dirOfChoise.getElementsByTagName("input")[0];
      input.focus();
    } else {
      props.sentDebt(debtData);
    }
  }, [
    showCreateDriver,
    showCreateCategory,
    showCreateSum,
    showCreateAddInfo,
    showCreateDebtStatus,
  ]);
  const handleGetFocus = (e) => {
    if (debtData.date == null) setShowCreateDate(true);
  };
  const handleGetDate = (e) => {
    let objData = debtData;
    setDateOfPayment(e.target.value);
    objData.date = e.target.value;
    setDebtData(objData);
  };
  const handleLostFocus = (e) => {
    if (debtData.date == null) handleGetDate(e);
    setShowCreateDate(false);
    if (debtData.idDriver == null) setShowCreateDriver(true);
  };

  const handleClickTdDriver = () => {
    if (debtData.idDriver == null) setShowCreateDriver(true);
  };
  const setValueDriver = (driverObj) => {
    let objData = debtData;
    objData.idDriver = driverObj._id;
    objData.driverValue = driverObj.value;
    setDebtData(objData);
    setShowCreateDriver(false);
    if (debtData.idCategory == null) setShowCreateCategory(true);
  };

  const handleClickTdCategory = () => {
    if (debtData.idCategory == null) setShowCreateCategory(true);
  };
  const setValueCategory = (categoryObj) => {
    let objData = debtData;
    objData.idCategory = categoryObj._id;
    objData.categoryValue = categoryObj.value;
    setDebtData(objData);
    setShowCreateCategory(false);
    if (debtData.sumOfDebt == null || debtData.sumOfDebt == 0)
      setShowCreateSum(true);
  };

  const handleClickSum = () => {
    if (debtData.sumOfDebt == null || debtData.sumOfDebt == 0)
      setShowCreateSum(true);
  };
  const handleGetSum = (e) => {
    let objData = debtData;
    objData.sumOfDebt = Number(e.target.value);
    setDebtData(objData);
    setShowCreateSum(false);
    if (debtData.addInfo == "") setShowCreateAddInfo(true);
  };

  const handleClickAddInfo = () => {
    if (debtData.addInfo == "") setShowCreateAddInfo(true);
  };
  const handleGetAddInfo = (e) => {
    let objData = debtData;
    objData.addInfo = e.target.value;
    setDebtData(objData);
    setShowCreateAddInfo(false);
    setShowCreateStatus(true);
  };

  const setValueStatus = (statusObj) => {
    let objData = debtData;
    objData.idDebtClosed = statusObj._id;
    objData.debtClosedValue = statusObj.value;
    setDebtData(objData);
    setShowCreateStatus(false);
  };

  const handleSaveByEnter = (e) => {
    if (e.key == "Enter") props.sentDebt(debtData);
  };
  const handleBlur = (e) => {
    if(!e.currentTarget.contains(e.relatedTarget)){
      if (debtData.idDriver && debtData.sumOfDebt) props.sentDebt(debtData);
    }
  };
  return (
    <tr
      tabIndex={1}
      className="driverDebtCreateTr"
      onKeyDown={handleSaveByEnter}
      onBlur={handleBlur}
    >
      <td className="driverDebtCreateTd" onClick={handleGetFocus}>
        {showCreateDate ? (
          <input
            className="driveDebtCreateInput"
            type="date"
            value={dateOfPayment}
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
              setValue={setValueDriver}
            />
          </div>
        ) : (
          debtData.driverValue
        )}
      </td>
      <td className="driverDebtCreateTd" onClick={handleClickTdCategory}>
        {showCreateCategory ? (
          <div className="driverDebtCreateChoise">
            <ChoiseList
              name="category"
              arrlist={categoryList}
              setValue={setValueCategory}
            />
          </div>
        ) : (
          debtData.categoryValue
        )}
      </td>
      <td className="driverDebtCreateTd" onClick={handleClickSum}>
        {showCreateSum ? (
          <div className="driverDebtCreateChoise">
            <input
              className="driveDebtCreateInput"
              type="number"
              onBlur={handleGetSum}
            />
          </div>
        ) : (
          debtData.sumOfDebt
        )}
      </td>
      <td className="driverDebtCreateTd" onClick={handleClickAddInfo}>
        {showCreateAddInfo ? (
          <div className="driverDebtCreateChoise">
            <input
              className="driveDebtCreateInput"
              type="text"
              onBlur={handleGetAddInfo}
            />
          </div>
        ) : (
          debtData.addInfo
        )}
      </td>
      <td className="driverDebtCreateTd">
        {showCreateDebtStatus ? (
          <div className="driverDebtCreateChoise">
            <ChoiseList
              name="status"
              arrlist={props.fullStatusList}
              setValue={setValueStatus}
            />
          </div>
        ) : (
          debtData.debtClosedValue
        )}
      </td>
    </tr>
  );
};
