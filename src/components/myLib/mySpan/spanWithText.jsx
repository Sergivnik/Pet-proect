import React, { useEffect, useState } from "react";
import "./spanWithList.sass";

export const SpanWithText = (props) => {
  const name = props.name;

  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    setText(props.text);
  }, [props.text]);
  useEffect(() => {
    if (showInput) {
      let div = document.querySelector(".mySpanDivChoise");
      let parent = div.parentNode.parentNode;
      div.style.height = parent.clientHeight + "px";
      div.style.width = parent.clientWidth + "px";
      console.log(parent.clientWidth);
    }
  }, [showInput]);

  const handleChange = (e) => {
    console.log(e);
    setText(e.currentTarget.value);
  };
  const handleDblClick = () => {
    setShowInput(true);
  };
  const handleEnter = (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
      props.getText(text, name);
      setShowInput(false);
    }
    if (e.key == "Escape") {
      setShowInput(false);
    }
  };
  return (
    <span className="mySpan" onDoubleClick={handleDblClick}>
      {showInput ? (
        <div className="mySpanDivChoise">
          <input
            className="inputText"
            name={name}
            value={text}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        </div>
      ) : isNaN(Number(text)) ? (
        text
      ) : (
        Number(text).toLocaleString()
      )}
    </span>
  );
};
