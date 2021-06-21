import React, { useEffect, useState } from "react";
import "./userWindow.sass";

export const UserWindow = (props) => {
  const handleMouseDown = (e) => {
    let tag = e.target;
    if (tag.className == "userWindowHeaderName") {
      document.addEventListener("mousemove", handleMouseMove);
    }
  };
  const handleMouseMove = (e) => {
    let userObj = document.getElementsByClassName("userWindowDiv")[0];
    let userHeader = document.getElementsByClassName("userWindowHeaderName")[0];
    userObj.style.left = e.clientX - userHeader.offsetWidth / 2 + "px";
    userObj.style.top = e.clientY - userHeader.offsetHeight / 2 + "px";
  };
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };

  return (
    <div className="userWindowDiv">
      <header
        className="userWindowHeader"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="userWindowHeaderName">{props.header}</div>
        <div className="userWindowHeaderClose">
          <svg
            width="20px"
            height="20px"
            onClick={props.handleClickWindowClose}
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
      {props.children}
    </div>
  );
};
