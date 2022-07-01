import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib";
import "./reports.sass";

export const TaxesDriver = () => {
  const customerPayments = useSelector(
    (state) => state.oderReducer.customerPaymentsList
  );
  const contractorsPayments = useSelector(
    (state) => state.oderReducer.contractorsPayments
  );
  const driverpayments = useSelector(
    (state) => state.oderReducer.driverpayments
  );
  const driverlist = useSelector((state) => state.oderReducer.driverlist);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const contractorsList = useSelector(
    (state) => state.oderReducer.contractorsList
  );

  const [dateBegin, setDateBegin] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [summIn, setSumIn] = useState(0);
  const [summOut, setSumOut] = useState(0);

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      let date = new Date(e.currentTarget.value);
      if (e.currentTarget.name == "dateBegin") setDateBegin(date);
      if (e.currentTarget.name == "dateEnd") setDateEnd(date);
    }
  };
  const handleBlur = (e) => {
    if (e.currentTarget.value != "") {
      let date = new Date(e.currentTarget.value);
      if (e.currentTarget.name == "dateBegin") setDateBegin(date);
      if (e.currentTarget.name == "dateEnd") setDateEnd(date);
    }
  };
  const handleDBLClick = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.currentTarget.id == "dateBegin") setDateBegin(null);
    if (e.currentTarget.id == "dateEnd") setDateEnd(null);
  };
  const handleClickBtn = () => {
    if (dateBegin != null && dateEnd != null) {
      let arr = [];
      let index = 0;
      customerPayments.forEach((elem) => {
        let date = new Date(elem.date);
        if (date >= dateBegin && date <= dateEnd) {
          arr.push({
            id: index++,
            date: date,
            counterparty: findValueBy_Id(elem.idCustomer, clientList)
              .companyName,
            sumIn: elem.sumOfPayment,
            sumOut: null,
          });
        }
      });
      contractorsPayments.forEach((elem) => {
        let date = new Date(elem.date);
        if (date >= dateBegin && date <= dateEnd) {
          arr.push({
            id: index++,
            date: date,
            counterparty: findValueBy_Id(elem.idContractor, contractorsList)
              .value,
            sumIn: null,
            sumOut: elem.sum,
          });
        }
      });
      driverpayments.forEach((elem) => {
        let date = new Date(elem.date);
        if (date >= dateBegin && date <= dateEnd) {
          arr.push({
            id: index++,
            date: date,
            counterparty: findValueBy_Id(elem.idDriver, driverlist).companyName,
            sumIn: null,
            sumOut: elem.sumOfPayment - elem.sumOfDebts,
          });
        }
      });
      let sumArrIn = 0;
      let sumArrOut = 0;
      arr.forEach((elem) => {
        sumArrIn = sumArrIn + Number(elem.sumIn);
        sumArrOut = sumArrOut + Number(elem.sumOut);
      });
      arr.sort((a, b) => {
        let aDate = new Date(a.date);
        let bDate = new Date(b.date);
        if (aDate > bDate) return 1;
        if (aDate == bDate) return 0;
        if (aDate < bDate) return -1;
      });
      console.log(arr);
      setReportData(arr);
      setSumIn(sumArrIn);
      setSumOut(sumArrOut);
      setShowReport(true);
    }
  };

  return (
    <div className="divContainer">
      <header className="taxReportHeader">
        <h3 className="taxReportH3">Отчет по УСН</h3>
        <div className="taxReportHeaderDiv">
          <span>Дата с </span>
          {dateBegin == null ? (
            <div>
              <input
                name="dateBegin"
                type="date"
                onKeyDown={handleEnter}
                onBlur={handleBlur}
              />
            </div>
          ) : (
            <span
              id="dateBegin"
              onDoubleClick={handleDBLClick}
              onMouseDown={(e) => {
                e.preventDefault();
                return false;
              }}
            >
              {dateBegin.toLocaleDateString()}
            </span>
          )}
          <span>по </span>
          {dateEnd == null ? (
            <div>
              <input
                name="dateEnd"
                type="date"
                onKeyDown={handleEnter}
                onBlur={handleBlur}
              />
            </div>
          ) : (
            <span
              id="dateEnd"
              onDoubleClick={handleDBLClick}
              onMouseDown={(e) => {
                e.preventDefault();
                return false;
              }}
            >
              {dateEnd.toLocaleDateString()}
            </span>
          )}
          <button onClick={handleClickBtn}>Сформировать</button>
        </div>
      </header>
      <div className="taxReportMainDiv">
        {showReport && (
          <table className="taxReportTable">
            <thead className="taxReportTableHeader">
              <tr>
                <td className="taxReportTableHeaderTd">Дата</td>
                <td className="taxReportTableHeaderTd">Контрагент</td>
                <td className="taxReportTableHeaderTd">Приход</td>
                <td className="taxReportTableHeaderTd">Расход</td>
              </tr>
            </thead>
            <tbody>
              {reportData.map((elem) => {
                return (
                  <tr key={`taxReport${elem.id}`}>
                    <td className="taxReportTableTd">
                      {elem.date.toLocaleDateString()}
                    </td>
                    <td className="taxReportTableTd">{elem.counterparty}</td>
                    <td className="taxReportTableTd">{elem.sumIn}</td>
                    <td className="taxReportTableTd">{elem.sumOut}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td>{summIn}</td>
                <td>{summOut}</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};
