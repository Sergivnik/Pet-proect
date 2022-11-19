import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../../choiseList/choiseList.jsx";
import "./customerOrders.sass";

export const CustomerPointForm = (props) => {
  const citiesList = useSelector((state) => state.customerReducer.citiesList);
  const storelist = useSelector((state) => state.customerReducer.storelist);

  const [showAddPoint, setShowAddPoint] = useState(true);

  useEffect(() => {
    if (props.pointList.length != 0) setShowAddPoint(false);
  }, [props]);

  const setPoint = (data) => {
    console.log(data);
  };
  return (
    <div className="customerPointFormDiv">
      <header className="customerPointFormHeader">
        <h5 className="customerPointFormHeaderH5">Дата</h5>
        <h5 className="customerPointFormHeaderH5">Город</h5>
        <h5 className="customerPointFormHeaderH5">Склад</h5>
        <h5 className="customerPointFormHeaderH5">Примечание</h5>
      </header>
      <main className="customerPointFormMain">
        {props.pointList.map((pointId, index) => {
          <div key={`pointData-${index}`} className="customerPointDataDiv">
            <div
              onClick={() => {
                handleClickMinis(index);
              }}
            >
              <svg viewBox="0 0 120 120" className="PFBtnSvg">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="black"
                  strokeWidth="10"
                  fill="none"
                />
                <rect x="15" y="50" width="90" height="20" rx="10" ry="10" />
              </svg>
            </div>
          </div>;
        })}
        {showAddPoint ? (
          <div className="customerPointDataDiv">
            <div className="wrapprDivSVG">
              <svg viewBox="0 0 120 120" className="PFBtnSvg">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="black"
                  strokeWidth="10"
                  fill="none"
                />
                <rect x="15" y="50" width="90" height="20" rx="10" ry="10" />
              </svg>
            </div>
            <div className="customerPointInputWrapper">
              <input type="date" className="customerPointInput" />
            </div>
            <div className="customerPointInputWrapper">
              <ChoiseList
                name="point"
                arrlist={citiesList}
                setValue={setPoint}
              />
            </div>
            <div className="customerPointInputWrapper">
              <ChoiseList
                name="point"
                arrlist={storelist}
                setValue={setPoint}
              />
            </div>
            <div className="customerPointInputWrapper">
              <input type="text" className="customerPointInput" />
            </div>
          </div>
        ) : (
          <div>
            <svg viewBox="0 0 120 120" className="PFBtnSvg">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="black"
                strokeWidth="10"
                fill="none"
              />
              <rect x="15" y="50" width="90" height="20" rx="10" ry="10" />
              <rect x="50" y="15" width="20" height="90" rx="10" ry="10" />
            </svg>
          </div>
        )}
      </main>
    </div>
  );
};
