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
  useEffect(() => {
    let input = document.querySelector(".inputText");
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.focus();
  }, []);
  return (
    <React.Fragment>
      <input
        className="inputText"
        type="text"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKey}
      />
    </React.Fragment>
  );
};
