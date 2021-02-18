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
      console.log(elSelect.firstChild);
      elSelect.focus();
      elSelect.firstChild.selected = true;
    }
  };
  const handleChoiseEnter = (event) => {
    if (event.keyCode == 13) {
      let id = elSelect.value;
      list.forEach((elem) => {
        if (elem.id == id) setText(elem.driver);
      });
      console.log(elSelect.value);
    }
  };

  return (
    <div className="divList">
      <input
        type="search"
        onChange={getText}
        onKeyUp={handleKeyUp}
        value={text}
        className="inputList"
      />
      <select
        ref={(select) => {
          elSelect = select;
        }}
        size="5"
        onKeyUp={handleChoiseEnter}
        className="selectList"
      >
        {list.map((elem) => {
          return (
            <option key={elem.id} value={elem.id}>
              {elem.driver}
            </option>
          );
        })}
      </select>
    </div>
  );
};
