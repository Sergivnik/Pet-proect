import React, { useEffect, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import "./clock.sass";

export const Clock = (props) => {
  let arrDiv = [];
  for (let i = 0; i < 60; i++) {
    arrDiv.push(i);
  }
  const [sec, setSec] = useState(null);
  const [min, setMin] = useState(null);
  const [hour, setHour] = useState(null);

  useEffect(() => {
    let clockContainer = document.querySelector(".clockContainer");
    clockContainer.style.width = `${props.size}px`;
    clockContainer.style.height = `${props.size}px`;
    let minMarks = document.querySelectorAll(".minMark");
    minMarks.forEach((elem, index) => {
      elem.style.backgroundColor = props.color;
      if (index % 5 == 0) {
        elem.style.width = "8%";
      }
    });
    let i = 0;
    const getX = (i) => {
      let angle = (Math.PI / 30) * i - Math.PI / 2;
      if (i % 5 == 0) {
        return (props.size * 0.92 * Math.cos(angle)) / 2;
      } else {
        return (props.size * 0.96 * Math.cos(angle)) / 2;
      }
    };
    const getY = (i) => {
      let angle = (Math.PI / 30) * i - Math.PI / 2;
      if (i % 5 == 0) {
        return (props.size * 0.92 * Math.sin(angle)) / 2;
      } else {
        return (props.size * 0.96 * Math.sin(angle)) / 2;
      }
    };
    for (const mark of minMarks) {
      gsap.to(mark, { rotate: i * 6 - 90 });
      gsap.to(mark, {
        x: getX(i),
        y: getY(i),
        duration: 2,
        ease: "bounce.out",
        delay: i % 5 != 0 ? 0 : i / 25,
      });
      i++;
    }
  }, []);
  useEffect(() => {
    let date = new Date();
    setSec(date.getSeconds());
    setMin(date.getMinutes());
    setHour(date.getHours());
    let divSec = document.querySelector(".secArrow");
    let divMin = document.querySelector(".minArrow");
    let divHour = document.querySelector(".hourArrow");
    divSec.style.width = `${props.size / 10}px`;
    divSec.style.height = `${props.size}px`;
    divMin.style.width = `${props.size / 10}px`;
    divMin.style.height = `${props.size}px`;
    divHour.style.width = `${props.size / 10}px`;
    divHour.style.height = `${props.size}px`;
  }, []);
  useEffect(() => {
    let timeOut = setTimeout(() => {
      let secArrow = document.querySelector(".secArrow");
      let minArrow = document.querySelector(".minArrow");
      let hourArrow = document.querySelector(".hourArrow");
      let date = new Date();
      let nowSec = date.getSeconds();
      let nowMin = date.getMinutes();
      let nowHour = date.getHours();
      if (sec != nowSec) {
        setSec(nowSec);
      } else setSec(nowSec + 1);
      setMin(nowMin);
      setHour(nowHour);
      secArrow.style.transform = `rotate(${nowSec * 6}deg)`;
      minArrow.style.transform = `rotate(${nowMin * 6}deg)`;
      hourArrow.style.transform = `rotate(${nowHour * 30 + nowMin / 2}deg)`;
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [sec]);
  return (
    <div className="clockContainer">
      {arrDiv.map((elem) => {
        return <div key={`mark${elem}`} className="minMark"></div>;
      })}
      <div className="secArrow">
        <svg width={props.size / 10} height={props.size} viewBox="0 0 10 100">
          <polygon
            points="4,60 5,0 6,60 5,57"
            fill={props.color}
            strokeWidth="1"
          />
          <circle cx="5" cy="50" r="5" fill={props.color} />
        </svg>
      </div>
      <div className="minArrow">
        <svg width={props.size / 10} height={props.size} viewBox="0 0 10 100">
          <polygon
            points="3,60 5,10 7,60 5,57"
            fill={props.color}
            strokeWidth="1"
          />
          <polygon points="4.5,42.5 5,20 5.5,42.5" fill={`white`} strokeWidth="1" />
          <circle cx="5" cy="50" r="5" fill={props.color} />
        </svg>
      </div>
      <div className="hourArrow">
        <svg width={props.size / 10} height={props.size} viewBox="0 0 10 100">
          <polygon
            points="2,60 5,20 8,60 5,57"
            fill={props.color}
            strokeWidth="1"
          />
          <polygon points="4.5,42.5 5,30 5.5,42.5" fill={`white`} strokeWidth="1" />
          <circle cx="5" cy="50" r="5" fill={props.color} />
        </svg>
      </div>
      {/* <span>{sec}</span> */}
    </div>
  );
};
