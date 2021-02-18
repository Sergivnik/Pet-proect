import React, { useState } from "react";
import "./choiseList.sass";

export const ChoiseList = (props) => {
  const [text, setText] = useState("");
  const [list, setList] = useState(props.arrlist);
  const originList = props.arrlist;
  let elSelect = null;

  const getText = (event) => {
    let test = event.currentTarget.value;
    setText(event.currentTarget.value);
    let regtext = new RegExp(test, "i");
    let arr = originList.filter((elem) => regtext.test(elem.driver));
    setList(arr);
  };
  const handleKeyUp = (event) => {
    if (event.keyCode == 40) {
      console.log("down");
      elSelect.focus();
    }
  };

  return (
    <div className="divList">
      <input
        type="text"
        onChange={getText}
        onKeyUp={handleKeyUp}
        value={text}
        className="inputList"
      />
      <select
        ref={(select) => {
          elSelect = select;
        }}
        size="10"
        className="selectList"
      >
        {list.map((elem) => (
          <option key={elem.id}>{elem.driver}</option>
        ))}
      </select>
    </div>
  );
};
