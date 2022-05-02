import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { getReportData } from "../../actions/reportActions.js";
import { dateLocal } from "../myLib/myLib.js";

import "./reports.sass";

export const ReconciliationAct = () => {
  const dispatch = useDispatch();

  const customerList = useSelector((state) => state.oderReducer.clientList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);

  const reconciliation = useSelector(
    (state) => state.reportReducer.reconciliation
  );

  const [currentTab, setCurrentTab] = useState("TabOrder");
  const [showChoise, setShowChoise] = useState(true);
  const [reqData, setReqData] = useState({
    name: null,
    id: null,
    dateBegin: null,
    dateEnd: null,
    value: null,
  });

  const divTabStyle = (tabId) => {
    if (tabId == currentTab) {
      return "divTab divWithWhiteBottom";
    } else return "divTab";
  };

  const handleClickTabDiv = (e) => {
    setCurrentTab(e.currentTarget.id);
  };
  const setValue = (data) => {
    console.log(data);
    setShowChoise(false);
    let { ...obj } = reqData;
    obj.name = data.field;
    obj.id = data._id;
    obj.value = data.value;
    setReqData(obj);
  };
  const handleEnterTab = (e) => {
    if (e.key == "Enter" || e.key == "Tab") {
      let { ...obj } = reqData;
      let date = new Date(e.currentTarget.value);
      if (e.currentTarget.name == "dateBegin") obj.dateBegin = date;
      if (e.currentTarget.name == "dateEnd") obj.dateEnd = date;
      setReqData(obj);
    }
  };
  const handleClickReport = () => {
    dispatch(getReportData(reqData));
  };
  return (
    <div className="reconciliationDiv">
      <header style={{ height: "25%" }}>
        <h4 className="headerH">АктСверки</h4>
        <div className="tabsContainer">
          <div style={{ display: "flex" }}>
            <div
              id="TabOrder"
              className={divTabStyle("TabOrder")}
              onClick={handleClickTabDiv}
            >
              Заказчик
            </div>
            <div
              id="TabDriver"
              className={divTabStyle("TabDriver")}
              onClick={handleClickTabDiv}
            >
              Перевозчик
            </div>
          </div>
          <div className="btnContainer">
            <button className="reconciliationBtn" onClick={handleClickReport}>
              Отчет
            </button>
            <button className="reconciliationBtn">Печать</button>
          </div>
        </div>
        <div className="divParamSearch">
          <span>{currentTab == "TabOrder" ? "Заказчик" : "Перевозчик"}</span>
          {showChoise ? (
            <div className="divParamChoise">
              <ChoiseList
                name={currentTab == "TabOrder" ? "customer" : "driver"}
                arrlist={currentTab == "TabOrder" ? customerList : driversList}
                setValue={setValue}
              />
            </div>
          ) : (
            <span>{reqData.value !== null ? reqData.value : ""}</span>
          )}
          <span>Дата с </span>
          {reqData.dateBegin == null ? (
            <div>
              <input name="dateBegin" type="date" onKeyDown={handleEnterTab} />
            </div>
          ) : (
            <span>{reqData.dateBegin.toLocaleDateString()}</span>
          )}
          <span> по </span>
          {reqData.dateEnd == null ? (
            <div>
              <input name="dateEnd" type="date" onKeyDown={handleEnterTab} />
            </div>
          ) : (
            <span>{reqData.dateEnd.toLocaleDateString()}</span>
          )}
        </div>
      </header>
      <main style={{ width: "100%", overflowY: "auto", height: "75%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <td style={{ border: "1px solid black" }}>Дата</td>
              <td style={{ border: "1px solid black" }}>Название операции</td>
              <td style={{ border: "1px solid black" }}>Приход</td>
              <td style={{ border: "1px solid black" }}>Расход</td>
            </tr>
          </thead>
          <tbody>
            {reconciliation.map((elem) => {
              return (
                <tr key={"reconciliation" + elem.id}>
                  <td style={{ border: "1px solid black" }}>
                    {dateLocal(elem.date)}
                  </td>
                  <td style={{ border: "1px solid black" }}>{elem.textInfo}</td>
                  <td style={{ border: "1px solid black" }}>
                    {elem.type == "inCome" ? elem.sum : ""}
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    {elem.type == "outCome" ? elem.sum : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};
