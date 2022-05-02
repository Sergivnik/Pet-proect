import React, { useEffect, useState } from "react";
import { DriverReport } from "./driverReport.jsx";
import { ReconciliationAct } from "./reconciliationAct.jsx";

import "./reports.sass";
export const Report = () => {
  const [currentReport, setCurrentReport] = useState(null);

  const handleClickBtnMenu = (e) => {
    let btnName = e.currentTarget.name;
    switch (btnName) {
      case "drivers":
        setCurrentReport(<DriverReport />);
        break;
      case "reconciliationAct":
        setCurrentReport(<ReconciliationAct/>);
        break;
      case "taxesReport":
        setCurrentReport(<div></div>);
        break;
      default:
        break;
    }
  };
  return (
    <div className="mainReportForm">
      <header className="headerReportForm">
        <button
          name="drivers"
          className="headerReportBtn"
          onClick={handleClickBtnMenu}
        >
          Отчет по водителям
        </button>
        <button
          name="reconciliationAct"
          className="headerReportBtn"
          onClick={handleClickBtnMenu}
        >
          Акт сверки с заказчиком
        </button>
        <button
          name="taxesReport"
          className="headerReportBtn"
          onClick={handleClickBtnMenu}
        >
          Отчет по УСН
        </button>
      </header>
      <main className="reportTable">{currentReport}</main>
    </div>
  );
};
