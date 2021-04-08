import React, { useEffect, useState } from "react";
import "./choiseList.sass";

export const ChoiseList = (props) => {
  const [text, setText] = useState("");
  const [list, setList] = useState(props.arrlist);
  const [showSelect, setShowSelect] = useState(true);
  const originList = props.arrlist;
  let elSelect = null;

  if (props.clear) setText("");

  const getText = (event) => {
    let test = event.currentTarget.value;
    setText(event.currentTarget.value);
    let regtext = new RegExp(test, "i");
    let arr = originList.filter((elem) => regtext.test(elem.value));
    setList(arr);
  };
  const handleKeyUp = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      event.stopPropagation();
    }
    if (event.key == "ArrowDown") {
      elSelect.focus();
      elSelect.firstChild.selected = true;
    }
  };
  const handleClick = (event) => {
    event.stopPropagation();
    let id = elSelect.value;
    list.forEach((elem) => {
      if (elem._id == id) {
        setText(elem.value);
        props.setValue({
          _id: elem._id,
          field: props.name,
          value: elem.value,
          index: props.index,
        });
      }
    });
    setShowSelect(false);
  };
  const handleChoiseEnter = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      event.stopPropagation();
      let id = elSelect.value;
      list.forEach((elem) => {
        if (elem._id == id) {
          setText(elem.value);
          props.setValue({
            _id: elem._id,
            field: props.name,
            value: elem.value,
            index: props.index,
          });
        }
      });
      setShowSelect(false);
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
        onKeyDown={(event) => {
          if (event.key == "Enter") event.preventDefault();
          return false;
        }}
        onKeyUp={handleKeyUp}
        value={text}
        className="inputList"
      />
      {showSelect && (
        <select
          ref={(select) => {
            elSelect = select;
          }}
          onKeyDown={(event) => {
            if (event.key == "Enter") event.preventDefault();
            return false;
          }}
          size="5"
          onKeyUp={handleChoiseEnter}
          onClick={handleClick}
          className="selectList"
        >
          {list.map((elem) => {
            return (
              <option
                key={elem._id}
                value={elem._id}
                onKeyDown={(event) => {
                  if (event.key == Enter) event.preventDefault();
                  return false;
                }}
              >
                {elem.value}
              </option>
            );
          })}
        </select>
      )}
    </React.Fragment>
  );
};
