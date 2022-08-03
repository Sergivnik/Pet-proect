import React, { useEffect, useState } from "react";
import "./userTd.sass";

export const TdWithText = (props) => {
  const text = props.text;
  const name = props.name;
  const elem = props.elem;

  const [showInput, setShowInput] = useState(false);
  const [fieldValue, setFieldValue] = useState(text);

  const setValue = (e) => {
    setFieldValue(e.currentTarget.value);
  };
  const handleDblClick = () => {
    setShowInput(true);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      props.getData(fieldValue, name, elem);
      setShowInput(false);
    }
  };
  useEffect(() => {
    if (showInput) {
      let div = document.querySelector(".myTdDivChoise");
      let parent = div.parentNode;
      div.style.width = parent.clientWidth + "px";
    }
  }, [showInput]);
  return (
    <td className="myTd" onDoubleClick={handleDblClick}>
      {showInput ? (
        <div className="myTdDivChoise">
          <input
            className="inputText"
            name={name}
            onChange={setValue}
            value={fieldValue}
            onKeyDown={handleEnter}
          />
        </div>
      ) : isNaN(Number(fieldValue)) ? (
        fieldValue
      ) : (
        Number(fieldValue).toLocaleString()
      )}
    </td>
  );
};
