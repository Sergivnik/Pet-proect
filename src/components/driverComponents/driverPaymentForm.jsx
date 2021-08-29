import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { DriverPaymentDebtTr } from "./driverPaymentDebtTr.jsx";
import { DriverPaymentTr } from "./driverPaymentTr.jsx";
import { getDataDriverDebt } from "../../actions/driverActions.js";
import "./driverForms.sass";

export const DriverPaymentForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDriverDebt());
  }, []);
  const odersList = useSelector((state) => state.oderReducer.originOdersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const driverDebtList = useSelector(
    (state) => state.oderReducer.driverDebtList
  );

  const [odersWithoutPayment, setOdersWithoutPayment] = useState([]);
  const [filteredOdersList, setFilteredOdersList] = useState([]);
  const [driverListWithoutPayment, setDriverListWithoutPayment] = useState([]);
  const [driverDebts, setDriverDebts] = useState([]);
  const [chosenDriver, setChosenDriver] = useState(null);
  const [showInputFieldDriver, setShowInputFieldDriver] = useState(true);
  const [currentDriverDebt, setCurrentDriverDebt] = useState(null);
  const [currentDriverSum, setCurrentDriverSum] = useState(null);
  const [currentDriverSumOfOders, setCurrentDriverSumOfOders] = useState(null);
  const [currentDriverSumOfDebts, setCurrentDriverSumOfDebts] = useState(null);
  const [chosenOders, setChosenOders] = useState([]);
  const [chosenDebts, setChosenDebts] = useState([]);
  const [showDetailsOders, setShowDetailsOders] = useState(false);
  const [showInputFieldOfDebt, setShowInputFieldOfDebt] = useState(true);
  const [sumOfChosenDebt, setSumOfChosenDebt] = useState(null);
  const [showDebts, setShowDebts] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [choiceEnabled, setChoiceEnabled] = useState(false);
  const [partOfLastDebt, setPartOfLastDebt] = useState(null);

  useEffect(() => {
    let arr = odersList.filter((elem) => elem.driverPayment != "Ок");
    setOdersWithoutPayment(arr);
    setFilteredOdersList(arr);
    let arrDriver = [];
    arr.forEach((elem) => {
      if (!arrDriver.includes(elem.idDriver)) arrDriver.push(elem.idDriver);
    });
    let arrObj = [];
    arrDriver.forEach((elem) => {
      let driver = driversList.find((item) => item._id == elem);
      arrObj.push(driver);
    });
    setDriverListWithoutPayment(arrObj);
  }, [odersList]);

  const setValue = (data) => {
    let arr = odersWithoutPayment.filter((elem) => elem.idDriver == data._id);
    setFilteredOdersList(arr);
    let sumOders = arr.reduce((sum, elem) => sum + Number(elem.driverPrice), 0);
    setCurrentDriverSum(sumOders);
    let arrDebt = driverDebtList.filter((elem) => elem.idDriver == data._id);
    let clone = [];
    arrDebt.forEach((elem) => {
      clone.push(Object.assign({}, elem));
    });
    setDriverDebts(clone);
    let sumDebt = arrDebt.reduce(
      (sum, elem) => sum + Number(elem.sumOfDebt) - Number(elem.paidPartOfDebt),
      0
    );
    setChosenDriver(data.value);
    setShowInputFieldDriver(false);
    setCurrentDriverDebt(sumDebt);
    setCurrentDriverSumOfOders(null);
    setShowDetailsOders(true);
    if (sumDebt != 0) {
      setShowDebts(true);
    } else setShowDebts(false);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      setSumOfChosenDebt(e.currentTarget.value);
      setShowInputFieldOfDebt(false);
      setChoiceEnabled(true);
    }
  };
  const handleClickInputDebt = () => {
    setShowInputFieldOfDebt(true);
    setChoiceEnabled(false);
  };
  const handleClickInputDriver = () => {
    setShowInputFieldDriver(true);
  };
  const choiseOders = (oderId, driverPrice) => {
    let [...arr] = chosenOders;
    let sum = currentDriverSumOfOders;
    if (!arr.includes(oderId)) {
      arr.push(oderId);
      sum = sum + driverPrice;
    } else {
      let index = arr.findIndex((elem) => elem == oderId);
      arr.splice(index, 1);
      sum = sum - driverPrice;
    }
    setChosenOders(arr);
    setCurrentDriverSumOfOders(sum);
    if (!showDebts) setShowBtn(true);
  };
  const choiseDebts = (debtId, sumOfDebt) => {
    let [...arr] = chosenDebts;
    let sum = currentDriverSumOfDebts;
    if (!arr.includes(debtId)) {
      arr.push(debtId);
      sum = sum + sumOfDebt;
    } else {
      let index = arr.findIndex((elem) => elem == debtId);
      arr.splice(index, 1);
      sum = sum - sumOfDebt;
    }
    if (sum >= Number(sumOfChosenDebt)) {
      let [...arrDebts] = driverDebts;
      let indexDebt = arrDebts.findIndex((elem) => elem.id == debtId);
      let lastDebtPart = sumOfDebt-sum+Number(sumOfChosenDebt);
      arrDebts[indexDebt].sumOfDebt = lastDebtPart+Number(arrDebts[indexDebt].paidPartOfDebt);
      arrDebts[indexDebt].debtClosed = "частично";
      setChosenDebts(arr);
      setPartOfLastDebt(lastDebtPart);
      setCurrentDriverSumOfDebts(Number(sumOfChosenDebt));
      setShowBtn(true);
    } else {
      setChosenDebts(arr);
      setCurrentDriverSumOfDebts(sum);
    }
  };
  const handleClickBtn=()=>{
    console.log(chosenOders, chosenDebts, partOfLastDebt);
  }
  return (
    <div className="driverPaymentMainDiv">
      <header className="driverPaymentHeader">
        <div className="driverPaymentChoise">
          <p className="driverPaymentChoiseP">Перевозчик</p>
          {showInputFieldDriver ? (
            <ChoiseList
              name="driver"
              arrlist={driverListWithoutPayment}
              setValue={setValue}
            />
          ) : (
            <div onClick={handleClickInputDriver}>{chosenDriver}</div>
          )}
        </div>
        {showDetailsOders && (
          <div className="driverPaymentDetails">
            <p className="driverPaymentChoiseP">Стоимость рейсов</p>
            <div>{currentDriverSum}</div>
          </div>
        )}
        {showDetailsOders && (
          <div className="driverPaymentDetails">
            <p className="driverPaymentChoiseP">Выбрано для оплаты</p>
            <div>{currentDriverSumOfOders}</div>
          </div>
        )}
        {showDebts && (
          <div className="driverPaymentDetails">
            <p className="driverPaymentChoiseP">Долг перевозчика</p>
            <div>{currentDriverDebt}</div>
          </div>
        )}
        {showDebts && (
          <div className="driverPaymentDetails">
            <p className="driverPaymentChoiseP">Заплатить из долга</p>
            {showInputFieldOfDebt ? (
              <input type="Number" onKeyDown={handleEnter} />
            ) : (
              <div onClick={handleClickInputDebt}>
                {sumOfChosenDebt - currentDriverSumOfDebts}
              </div>
            )}
          </div>
        )}
        {showDetailsOders && (
          <div className="driverPaymentDetails">
            <p className="driverPaymentChoiseP">Сумма к оплате</p>
            <div>{currentDriverSumOfOders - sumOfChosenDebt}</div>
          </div>
        )}
      </header>
      <div className="driverDebtTableDiv">
        {showDebts && (
          <span className="driverPaymentTableSpan">Долги перевозчика</span>
        )}
        {showDebts && (
          <div className="driverPaymentDebtsDiv">
            <table className="driverDebtMainTable">
              <thead className="driverDebtMainHeader">
                <tr className="driverDebtMainHeaderTr">
                  <td className="driverDebtMainHeaderTd">
                    <span>Дата</span>
                  </td>
                  <td className="driverDebtMainHeaderTd">
                    <span>Перевозчик</span>
                  </td>
                  <td className="driverDebtMainHeaderTd">
                    <span>Категория</span>
                  </td>
                  <td className="driverDebtMainHeaderTd">
                    <span>Сумма</span>
                  </td>
                  <td className="driverDebtMainHeaderTd">Примечание</td>
                  <td className="driverDebtMainHeaderTd">
                    <span>Долг закрыт</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                {driverDebts.map((elem) => {
                  return (
                    <DriverPaymentDebtTr
                      key={elem.id}
                      debtData={elem}
                      choiseDebts={choiseDebts}
                      choiceEnabled={choiceEnabled}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <span className="driverPaymentTableSpan">Рейсы перевозчика</span>
        <div className="driverPaymentOdersDiv">
          <table className="driverDebtMainTable">
            <thead className="driverDebtMainHeader">
              <tr className="driverDebtMainHeaderTr">
                <td className="driverDebtMainHeaderTd">
                  <span>Дата</span>
                </td>
                <td className="driverDebtMainHeaderTd">
                  <span>Перевозчик</span>
                </td>
                <td className="driverDebtMainHeaderTd">
                  <span>Заказчик</span>
                </td>
                <td className="driverDebtMainHeaderTd">
                  <span>Погрузка</span>
                </td>
                <td className="driverDebtMainHeaderTd">
                  <span>Выгрузка</span>
                </td>
                <td className="driverDebtMainHeaderTd">
                  <span>Сумма</span>
                </td>
                <td className="driverDebtMainHeaderTd">
                  <span>Документы</span>
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredOdersList.map((elem) => {
                return (
                  <DriverPaymentTr
                    key={elem._id}
                    elem={elem}
                    choiseOders={choiseOders}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showBtn && <button onClick={handleClickBtn}>Провести</button>}
    </div>
  );
};
