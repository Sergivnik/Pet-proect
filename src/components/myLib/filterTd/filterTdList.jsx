import React, { useEffect, useState } from "react";
import "./filterTd.sass";

export const FilterTdList = (props) => {
  const [showList, setShowList] = useState(false);
  const [listIdValue, setListIdValue] = useState(props.listId);
  const [filteredList, setFilteredList] = useState(props.listId);
  const [text, setText] = useState("");
  const [btnText, setBtnText] = useState("Очистить всё");
  const [classFilterTdDiv, setClassFilterTdDiv] = useState("filterTdDiv");
  const [color, setColor] = useState("Black");

  useEffect(() => {
    let isChosen = props.listId.findIndex((elem) => elem.checked == false);
    if (isChosen != -1) {
      setColor("Blue");
    } else {
      setColor("Black");
    }
    setListIdValue(props.listId);
    setFilteredList(props.listId);
  }, [props.listId, showList]);

  const getText = (e) => {
    setText(e.currentTarget.value);
    let test = e.currentTarget.value;
    let regtext = new RegExp(test, "i");
    let arr = listIdValue.filter((elem) => {
      if (regtext.test(elem.value)) return elem;
    });
    setFilteredList(arr);
  };
  const handleClickFilter = (e) => {
    let tdParent = e.currentTarget.parentNode;
    let btn = e.currentTarget;
    if (tdParent.offsetLeft + btn.offsetLeft < 275) {
      setClassFilterTdDiv("filterTdDiv divLeft");
    } else {
      setClassFilterTdDiv("filterTdDiv");
    }
    setShowList(!showList);
  };
  const handleClickCheck = (e) => {
    let id = e.currentTarget.id;
    if (id == "") id = null;
    let [...arr] = filteredList;
    let elemId = arr.find((elem) => elem.id == id);
    elemId.checked = !elemId.checked;
    setFilteredList(arr);
  };
  const handleSelectAll = () => {
    let [...arr] = listIdValue;
    if (btnText == "Очистить всё") {
      setBtnText("Выделить всё");
      arr.forEach((elem) => (elem.checked = false));
    } else {
      setBtnText("Очистить всё");
      arr.forEach((elem) => (elem.checked = true));
    }
  };
  const handleClickOk = () => {
    props.getFilteredList(props.name, filteredList);
    setShowList(false);
  };
  return (
    <td className="filterTd">
      {props.title}
      <button
        className="filterBtnOpen"
        onClick={handleClickFilter}
        value={text}
      >
        <svg width="100%" height="20">
          <polygon points="5 5, 25 5, 15 15, 5 5 " fill={color} />
        </svg>
      </button>
      {showList && (
        <div className={classFilterTdDiv}>
          <input className="filterInput" type="text" onChange={getText} />
          <div className="filterListDiv">
            {filteredList.map((elem) => {
              return (
                <label key={`label${elem.id}`}>
                  <input
                    id={elem.id}
                    type="checkbox"
                    checked={elem.checked}
                    onChange={handleClickCheck}
                  />
                  {elem.value}
                </label>
              );
            })}
          </div>
          <div className="filterBtnDiv">
            <button className="filterBottomBtn" onClick={handleSelectAll}>
              {btnText}
            </button>
            <button className="filterBottomBtn" onClick={handleClickOk}>
              Ок
            </button>
            <button className="filterBottomBtn" onClick={handleClickFilter}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </td>
  );
};
