import React, { useEffect, useState } from "react";
import "./choiseList.sass";

export const ChoiseTwoList = (props) => {
  const [text, setText] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [list, setList] = useState([]);
  const [fullList, setFullList] = useState([]);

  useEffect(() => {
    let [...arr] = list;
    props.arr1.forEach((elem) => {
      arr.push({
        keyId: `arr1-${elem._id}`,
        value: elem[props.field1],
        id: elem._id,
      });
    });
    if (props.arr2)
      props.arr2.forEach((elem) => {
        arr.push({
          keyId: `arr2-${elem._id}`,
          value: elem[props.field2],
          id: elem[props.fieldSearch],
        });
      });
    setList(arr);
    setFullList(arr);
  }, []);

  const getText = (e) => {
    setShowSelect(true);
    let test = e.currentTarget.value;
    setText(test);
    let regtext = new RegExp(test, "i");
    let arr = fullList.filter((elem) => regtext.test(elem.value));
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
    let id = e.currentTarget.value;
    props.setValue({ _id: id });
    let elem = list.find((elem) => (elem.id = id));
    setText(elem.value);
    setShowSelect(false);
  };
  const handleEnter = (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
      let id = e.currentTarget.value;
      props.setValue({ _id: id });
      let elem = list.find((elem) => (elem.id = id));
      setText(elem.value);
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
                {elem.value}
              </option>
            );
          })}
        </select>
      )}
    </React.Fragment>
  );
};
