import React, { useEffect, useState } from "react";
import "./userWindow.sass";

export const UserWindow = (props) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startX, setStartX] = useState(0);
  const handleMouseDown = (e) => {
    let tag = e.target
    if (tag.className == "userWindowHeaderName") {
      setMouseDown(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
    }
  }
  const handleMouseMove = (e) => {
    let posX = e.currentTarget.offsetLeft
    if (mouseDown) {
      e.currentTarget.style.left = posX + e.clientX - startX + "px";
      console.log(e.currentTarget.offsetLeft, e.currentTarget.style.left, e.clientX - startX);
    }
  }
  const handleMouseUp = (e) => { setMouseDown(false) }

  return (
    <div className="userWindowDiv" onMouseMove={handleMouseMove}>
      <header className="userWindowHeader" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <div className="userWindowHeaderName">{props.header}</div>
        <div className="userWindowHeaderClose">
          <svg
            width="20px"
            height="20px"
            onClick={props.handleClickBtnMenu}
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
