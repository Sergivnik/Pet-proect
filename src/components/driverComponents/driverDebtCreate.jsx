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
  const categoryList = [
    { _id: 1, value: "Топливо" },
    { _id: 2, value: "Проценты" },
    { _id: 3, value: "Пинк" },
    { _id: 4, value: "Аванс" },
    { _id: 5, value: "Прочее" },
  ];

  const [dateOfPayment, setDateOfPayment] = useState(DateStr(now));
  const [showCreateDate, setShowCreateDate] = useState(false);
  const [showCreateDriver, setShowCreateDriver] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateSum, setShowCreateSum] = useState(false);
  const [showCreateAddInfo, setShowCreateAddInfo] = useState(false);
  const [debtData, setDebtData] = useState({
    date: null,
    idDriver: null,
    driverValue: "",
    idCategory: null,
    categoryValue: "",
    sumOfDebt: 0,
    debtClosed: "Нет",
    addInfo: "",
  });

  useEffect(() => {
    if (
      showCreateDriver ||
      showCreateCategory ||
      showCreateSum ||
      showCreateAddInfo
    ) {
      let dirOfChoise = document.querySelector(".driverDebtCreateChoise");
      let input = dirOfChoise.getElementsByTagName("input")[0];
      input.focus();
    }
  }, [showCreateDriver, showCreateCategory, showCreateSum, showCreateAddInfo]);
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
    console.log(e);
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
    if (debtData.sumOfDebt == 0) setShowCreateSum(true);
  };

  const handleClickSum = () => {
    if (debtData.sumOfDebt == 0) setShowCreateSum(true);
  };
  const handleGetSum = (e) => {
    let objData = debtData;
    objData.sumOfDebt = e.target.value;
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
  };

  const handleSaveByEnter = (e) => {
    if (e.key == "Enter") console.log(e);
  };
  return (
    <tr className="driverDebtCreateTr" onKeyDown={handleSaveByEnter}>
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
      <td className="driverDebtCreateTd"></td>
    </tr>
  );
};
