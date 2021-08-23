import React, { useEffect } from "react";
import "./userWindow.sass";

export const UserWindow = (props) => {
  let startX, startY;
  const handleMouseDown = (e) => {
    let tag = e.target;
    if (tag.className == "userWindowHeaderName") {
      startX = e.clientX;
      startY = e.clientY;
      document.addEventListener("mousemove", handleMouseMove);
    }
  };
  const handleMouseMove = (e) => {
    let userObj = document.getElementsByClassName("userWindowDiv")[0];
    userObj.style.left = userObj.offsetLeft - startX + e.clientX + "px";
    userObj.style.top = userObj.offsetTop - startY + e.clientY + "px";
    startX = e.clientX;
    startY = e.clientY;
  };
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
  const handleClickClose = ()=>{
    let div = document.getElementsByClassName("userWindowDiv")[0];
    div.style.opacity = 0.1;
    setTimeout(props.handleClickWindowClose, 1000); 
  }
  useEffect(()=>{
    let div = document.getElementsByClassName("userWindowDiv")[0];
    div.style.opacity = 0.95;
  },[props])

  return (
    <div className="userWindowDiv">
      <header
        className="userWindowHeader"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="userWindowHeaderName">{props.header}</div>
        <div className="userWindowHeaderClose">
          <svg width="20px" height="20px" onClick={handleClickClose}>
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
