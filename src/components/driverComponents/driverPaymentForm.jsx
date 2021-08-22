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
  const [currentDriverDebt, setCurrentDriverDebt] = useState(null);
  const [currentDriverSum, setCurrentDriverSum] = useState(null);
  const [showDebts, setShowDebts] = useState(false);

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
    setDriverDebts(arrDebt);
    let sumDebt = arrDebt.reduce(
      (sum, elem) => sum + Number(elem.sumOfDebt),
      0
    );
    setCurrentDriverDebt(sumDebt);
    if (sumDebt != 0) {
      setShowDebts(true);
    } else setShowDebts(false);
  };
  return (
    <div className="driverPaymentMainDiv">
      <header className="driverPaymentHeader">
        <div className="driverPaymentChoise">
          <p>Перевозчик</p>
          <ChoiseList
            name="driver"
            arrlist={driverListWithoutPayment}
            setValue={setValue}
          />
        </div>
        {showDebts && (
          <div>
            <p>Долг перевозчика</p>
            <div>{currentDriverDebt}</div>
          </div>
        )}
        {showDebts && (
          <div>
            <p>Стоимость рейсов</p>
            <div>{currentDriverSum}</div>
          </div>
        )}
      </header>
      <div className="driverDebtTableDiv">
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
                  return <DriverPaymentDebtTr key={elem.id} debtData={elem} />;
                })}
              </tbody>
            </table>
          </div>
        )}
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
                return <DriverPaymentTr key={elem._id} elem={elem} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
