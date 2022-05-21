import React, { useEffect, useState } from "react";
import "./choiseList.sass";

export const ChoiseTwoList = (props) => {
  const [text, setText] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [list, setList] = useState([]);
  const [fullList, setFullList] = useState([]);

  useEffect(() => {
    let arr = [];
    props.arr1.forEach((elem) => {
      arr.push({
        keyId: `arr1-${elem._id}`,
        value: elem[props.field1],
        value2: elem[props.field3],
        id: elem._id,
      });
    });
    if (props.arr2) {
      props.arr2.forEach((elem) => {
        arr.push({
          keyId: `arr2-${elem._id}`,
          value: elem[props.field2],
          id: elem[props.fieldSearch],
        });
      });
    }
    if (props.reset) {
      setText("");
    }
    setList(arr);
    setFullList(arr);
  }, [props]);
  useEffect(() => {
    if (text == "") setShowSelect(false);
  }, [text]);

  const getText = (e) => {
    setShowSelect(true);
    let test = e.currentTarget.value;
    setText(test);
    let regtext = new RegExp(test, "i");
    let arr = fullList.filter((elem) => {
      if (regtext.test(elem.value) || regtext.test(elem.value2)) return elem;
    });
    setList(arr);
  };
  const handleKeyDown = (e) => {
    if (e.key == "ArrowDown") {
      let select = document.querySelector("#choiseListSelect");
      select.focus();
      select.firstChild.selected = true;
    }
  };
  const handleOptionClick = (e) => {
    console.log(e.currentTarget);
    let id = e.currentTarget.value;
    props.setValue({ _id: id });
    let elem = list.find((elem) => (elem.id == id));
    setText(elem.value2 != undefined ? elem.value2 : elem.value);
    setShowSelect(false);
  };
  const handleEnter = (e) => {
    console.log(e.currentTarget);
    if (e.key == "Enter") {
      let id = e.currentTarget.value;
      props.setValue({ _id: id });
      let elem = list.find((elem) => (elem.id == id));
      setText(elem.value2 != undefined ? elem.value2 : elem.value);
      setShowSelect(false);
    }
  };
  return (
    <React.Fragment>
      <input
        type="text"
        className="inputList"
        autoComplete="off"
        value={text}
        onChange={getText}
        onKeyDown={handleKeyDown}
      />
      {showSelect && (
        <select
          className="selectList"
          size="5"
          name="select"
          id="choiseListSelect"
          onKeyDown={handleEnter}
        >
          {list.map((elem) => {
            return (
              <option
                key={elem.keyId}
                className="optionClass"
                value={elem.id}
                onClick={handleOptionClick}
              >
                {`${elem.value2 != undefined ? elem.value2 : ""} ${
                  elem.value != null ? elem.value : ""
                }`}
              </option>
            );
          })}
        </select>
      )}
    </React.Fragment>
  );
};
