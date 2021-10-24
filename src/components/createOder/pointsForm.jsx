import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import "./createOder.sass";

export const PointsForm = (props) => {
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  const [showAddPoint, setShowAddPoint] = useState(false);
  const [pointData, setPointData] = useState({});

  const handleClickMinis = (index) => {
    props.delPoint(index, props.name);
  };
  const handleClickPlus = () => {
    setShowAddPoint(true);
  };
  const handleEnter=(e)=>{
    console.log(e);
  }
  const setValue = (data) => {
    setPointData({ id: data._id, value: data.value });
    let input = document.querySelector(".crOderLoadInfo");
    input.focus();
  };
  const handleBlur = (e) => {
    let { ...obj } = pointData;
    obj.info = e.target.value;
    props.addPoint(obj, props.name);
    setPointData({});
    setShowAddPoint(false);
  };

  return (
    <div className="PFmainDiv">
      <div className="PFheader">
        <h5 className="PFhtaderH">Город</h5>
        <h5 className="PFhtaderH">Примечание</h5>
      </div>
      {props.pointsList.map((elem, index) => {
        return (
          <div className="PFContent" key={"LP" + index}>
            <div
              className="PFBtnWrap"
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
            <p className="PFContentPoint">{elem}</p>
            <p className="PFContentInfo">{props.infoList[index]}</p>
          </div>
        );
      })}
      <div className="PFContent">
        {showAddPoint ? (
          <>
            <div className="PFBtnWrap">
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
            <div className="PFContentPoint">
              <ChoiseList
                name="client"
                arrlist={citieslist}
                setValue={setValue}
              />
            </div>
            <div className="PFContentInfo">
              <input
                type="text"
                className="crOderLoadInfo"
                onBlur={handleBlur}
              />
            </div>
          </>
        ) : (
          <div
            className="PFBtnWrap"
            onClick={handleClickPlus}
            onKeyDown={handleEnter}
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
              <rect x="50" y="15" width="20" height="90" rx="10" ry="10" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
