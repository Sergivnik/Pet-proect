import React, { useEffect, useState } from "react";
import "./choiseList.sass";

export const ChoiseList = (props) => {
  const [text, setText] = useState("");
  const [list, setList] = useState(props.arrlist);
  const [showSelect, setShowSelect] = useState(true);
  const originList = props.arrlist;
  let elSelect = null;

  const getText = (event) => {
    let test = event.currentTarget.value;
    setText(event.currentTarget.value);
    let regtext = new RegExp(test, "i");
    let arr = originList.filter((elem) => regtext.test(elem.value));
    setList(arr);
  };
  const handleKeyUp = (event) => {
    if (event.keyCode == 40) {
      console.log(elSelect.firstChild);
      elSelect.focus();
      elSelect.firstChild.selected = true;
    }
  };
  const handleClick = (event) => {
    event.stopPropagation();
    let id = elSelect.value;
    list.forEach((elem) => {
      if (elem.id == id) {
        setText(elem.value);
        props.setValue(elem.value);
      }
    });
    setShowSelect(false);
  };
  const handleChoiseEnter = (event) => {
    if (event.keyCode == 13) {
      let id = elSelect.value;
      list.forEach((elem) => {
        if (elem.id == id) {
          setText(elem.value);
          props.setValue(elem.value);
        }
      });
      setShowSelect(false);
      console.log(elSelect.value);
    }
  };

  useEffect(() => {
    if (text === "") setShowSelect(true);
  }, [text]);

  return (
    <React.Fragment>
      <input
        type="text"
        id={props.name}
        onChange={getText}
        onKeyUp={handleKeyUp}
        value={text}
        className="inputList"
      />
      {showSelect && (
        <select
          ref={(select) => {
            elSelect = select;
          }}
          size="5"
          onKeyUp={handleChoiseEnter}
          onClick={handleClick}
          className="selectList"
        >
          {list.map((elem) => {
            return (
              <option key={elem.id} value={elem.id}>
                {elem.value}
              </option>
            );
          })}
        </select>
      )}
    </React.Fragment>
  );
};
