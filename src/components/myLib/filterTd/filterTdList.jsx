import React, { useEffect, useState } from "react";
import "./filterTd.sass";

export const FilterTdList = (props) => {
  const [showList, setShowList] = useState(false);
  const [listIdValue, setListIdValue] = useState([]);
  const [filteredList, setFilteredLest] = useState([]);
  const [text, setText] = useState("");
  const [btnText, setBtnText] = useState("Очистить всё");

  useEffect(() => {
    // let arr = [];
    // props.listId.forEach((id) => {
    //   let value = props.listElem.find((elem) => elem[props.fieldId] == id)[
    //     props.fieldValue
    //   ];
    //   arr.push({ id: id, value: value, checked: true });
    // });
    setListIdValue(props.listId);
    setFilteredLest(props.listId);
  }, [props.listId]);

  const getText = (e) => {
    setText(e.currentTarget.value);
    let test = e.currentTarget.value;
    let regtext = new RegExp(test, "i");
    let arr = listIdValue.filter((elem) => {
      if (regtext.test(elem.value)) return elem;
    });
    setFilteredLest(arr);
  };
  const handleClickFilter = () => {
    setShowList(!showList);
  };
  const handleClickCheck = (e) => {
    let id = e.currentTarget.id;
    let [...arr] = filteredList;
    let elemId = arr.find((elem) => elem.id == id);
    elemId.checked = !elemId.checked;
    setFilteredLest(arr);
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
    let arr = [];
    filteredList.forEach((elem) => {
      if (elem.checked) arr.push(elem.id);
    });
    props.getFilteredList(arr);
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
          <polygon
            points="5 5, 25 5, 15 15, 5 5 "
            //fill={props.filterList.date.length > 0 ? "blue" : "black"}
          />
        </svg>
      </button>
      {showList && (
        <div className="filterTdDiv">
          <input className="filterInput" type="text" onChange={getText} />
          <div className="filterListDiv">
            {filteredList.map((elem) => {
              return (
                <label key={elem.id}>
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
