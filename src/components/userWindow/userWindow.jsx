import React, { useEffect, useState } from "react";
import "./userWindow.sass";

export const UserWindow = (props) => {
  const [fullSeze, setFullSize] = useState(false);
  let startX, startY;
  const handleMouseDown = (e) => {
    e.preventDefault();
    let tag = e.target;
    if (tag.className == "userWindowHeaderName") {
      startX = e.clientX;
      startY = e.clientY;
      document.addEventListener("mousemove", handleMouseMove);
    }
  };
  const handleMouseMove = (e) => {
    let userObj = document.querySelector(`#${props.windowId}`);
    userObj.style.left = userObj.offsetLeft - startX + e.clientX + "px";
    userObj.style.top = userObj.offsetTop - startY + e.clientY + "px";
    startX = e.clientX;
    startY = e.clientY;
  };
  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
  };
  const handleClickClose = () => {
    let div = document.querySelector(`#${props.windowId}`);
    div.style.opacity = 0.1;
    setTimeout(props.handleClickWindowClose, 1000);
  };
  const handleClickFullSize = (e) => {
    let div = document.querySelector(`#${props.windowId}`);
    console.log(e);
    if (!fullSeze) {
      div.style.width = "100%";
      div.style.left = "0";
      div.style.height = "100%";
      div.style.top = "35px";
      setFullSize(true);
    } else {
      div.style.width = "1200px";
      div.style.left = "10%";
      div.style.height = "70vh";
      div.style.top = "10%";
      setFullSize(false);
    }
  };
  const handleDivClick = () => {
    let divs = document.querySelectorAll(".userWindowDiv");
    console.log(divs, props.windowId);
    divs.forEach((div) => {
      console.log(div.id);
      if (div.id == props.windowId) {
        div.style.zIndex = 30;
      } else {
        div.style.zIndex = 25;
      }
    });
  };
  useEffect(() => {
    let div = document.querySelector(`#${props.windowId}`);
    div.style.opacity = 0.95;
    if (props.width) div.style.width = props.width + "px";
  }, [props]);

  return (
    <div className="userWindowDiv" id={props.windowId} onClick={handleDivClick}>
      <header
        className="userWindowHeader"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleClickFullSize}
      >
        <div className="userWindowHeaderName">
          <span className="">{props.header}</span>
        </div>
        <div className="userWindowHeaderClose">
          {fullSeze ? (
            <svg width="20px" height="20px" onClick={handleClickFullSize}>
              <rect
                x="5%"
                y="20%"
                width="90%"
                height="55%"
                stroke="black"
                fill="transparent"
                strokeWidth="5%"
              ></rect>
              <rect
                x="5%"
                y="20%"
                width="90%"
                height="75%"
                stroke="black"
                fill="transparent"
                strokeWidth="5%"
              ></rect>
            </svg>
          ) : (
            <svg width="20px" height="20px" onClick={handleClickFullSize}>
              <rect
                x="5%"
                y="20%"
                width="90%"
                height="75%"
                stroke="black"
                fill="transparent"
                strokeWidth="5%"
              ></rect>
            </svg>
          )}
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
