import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./createOder.sass";

export const PointsForm = (props) => {
  console.log(props);
  return (
    <div className="PFmainDiv">
      <div className="PFheader">
        <h5 className="PFhtaderH">Город</h5>
        <h5 className="PFhtaderH">Примечание</h5>
      </div>
      {props.pointsList.map((elem, index) => {
        return (
          <div className="PFContent" key={"LP" + index}>
            <div className="PFBtnWrap">
              <div className="PFBtn">
                <svg width="10" height="10" viewBox="0 0 100 100">
                  <rect x="0" y="40" width="100" height="20" rx="10" ry="10" />
                  <rect x="40" y="0" width="20" height="100" rx="10" ry="10" />
                </svg>
              </div>
            </div>
            <p className="PFContentPoint">{elem}</p>
            <p className="PFContentInfo">{props.infoList[index]}</p>
          </div>
        );
      })}
      <div className="PFContent">
        <div className="PFBtnWrap">
          <div className="PFBtn"></div>
        </div>
      </div>
    </div>
  );
};
