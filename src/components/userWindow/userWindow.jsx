import React from "react";
import "./userWindow.sass";

export const UserWindow = (props) => {
  const test = () => {
    alert("hi");
  };
  return (
    <div className="userWindowDiv">
      <header className="userWindowHeader">
        <div className="userWindowHeaderName">{props.header}</div>
        <div className="userWindowHeaderClose">
          <svg
            width="20px"
            height="20px"
            onClick={test}
          >
            <rect
              x="5%"
              y="48.5%"
              width="90%"
              height="10%"
              transform="rotate(45)"
            />
            <rect
              x="5%"
              y="48.5%"
              width="90%"
              height="10%"
              transform="rotate(-45)"
            />
          </svg>
        </div>
      </header>
      OtherExpenses
    </div>
  );
};
