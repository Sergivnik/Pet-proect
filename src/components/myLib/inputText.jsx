import React, { useEffect, useState } from "react";

export const InputText = (props) => {
  const [text, setText] = useState(props.text);
  const handleChange = (e) => {
    setText(e.currentTarget.value);
  };
  const handleKey = (e) => {
    if (e.code == "Enter" || e.code == "Tab" || e.code == "NumpadEnter") {
      props.getText(props.name, text);
    }
  };
  const handleBlur = () => {
    props.getText(props.name, text);
  };
  useEffect(() => {
    let input = document.querySelector(".inputText");
    //input.style.width = "100%";
    //input.style.boxSizing = "border-box";
    input.focus();
  }, []);
  return (
    <React.Fragment>
      <input
        className="inputText"
        style={{ width: "100%", boxSizing: "border-box", height: "100%" }}
        type={props.typeInput}
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKey}
      />
    </React.Fragment>
  );
};
