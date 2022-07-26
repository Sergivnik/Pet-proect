import React, { useEffect, useState } from "react";
import { dateLocal } from "../myLib";
import "./spanWithList.sass";

export const SpanWithDate = (props) => {
  const name = props.name;

  const [showInput, setShowInput] = useState(false);
  const [date, setDate] = useState(props.date);
  const [oldDate, setOldDate] = useState(null);

  useEffect(() => {
    let date = new Date(props.date);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    setOldDate(`${year}-${month}-${day}`);
    setDate(`${year}-${month}-${day}`);
  }, [props.date]);

  const handleChange = (e) => {
    console.log(e);
    setDate(e.currentTarget.value);
  };
  const handleDblClick = () => {
    setShowInput(true);
  };
  const handleEnter = (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
      props.getDate(date, name);
      setShowInput(false);
    }
    if (e.key == "Escape") {
      props.getDate(oldDate, name);
      setShowInput(false);
    }
  };
  const handleBlur = () => {
    props.getDate(date, name);
    setShowInput(false);
  };
  return (
    <span className="mySpan" onDoubleClick={handleDblClick}>
      {showInput ? (
        <div className="mySpanDivChoise">
          <input
            type="date"
            className="inputDate"
            name={name}
            value={date}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
          />
        </div>
      ) : (
        dateLocal(date)
      )}
    </span>
  );
};
