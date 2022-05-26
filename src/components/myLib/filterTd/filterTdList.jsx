import React, { useEffect, useState } from "react";
import { InputText } from "../inputText.jsx";
import "./filterTd.sass";

export const FilterTdList = (props) => {
  const [showList, setShowList] = useState(false);
  const [listIdValue, setListIdValue] = useState([]);
  const [filteredList, setFilteredLest] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    let arr = [];
    props.listId.forEach((id) => {
      let value = props.listElem.find((elem) => elem[props.fieldId] == id)[
        props.fieldValue
      ];
      arr.push({ id: id, value: value, checked: true });
    });
    setListIdValue(arr);
    setFilteredLest(arr);
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
  const handleClickCheck = (e) => {};
  console.log(listIdValue);
  return (
    <td className="filterTd">
      {props.name}
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
            <button className="filterBottomBtn">Выделить всё</button>
            <button className="filterBottomBtn">Ок</button>
            <button className="filterBottomBtn">Отмена</button>
          </div>
        </div>
      )}
    </td>
  );
};
