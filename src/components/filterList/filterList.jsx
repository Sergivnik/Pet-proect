import React, { useEffect, useState } from "react";
import "./filterList.sass";

export const FilterList = (props) => {
  const [text, setText] = useState("");
  const [list, setList] = useState(props.arrlist);
  const [chosenList, setChosenList] = useState([]);

  const changeList = (e) => {
    let test = e.currentTarget.value;
    setText(e.currentTarget.value);
    let regtext = new RegExp(test, "i");
    let arr = props.arrlist.filter((elem) => regtext.test(elem.value));
    setList(arr);
  };

  const choiseValue = (e) => {
    let [...arr] = chosenList;
    console.log(e.target.checked);
    let check = arr.findIndex((elem) => elem.id === e.target.value);
    if (check>=0) {
      arr.splice(check, 1);
    } else {
      arr.push({ id: e.target.value, value: e.target.name });
    }
    setChosenList(arr);
  };

  return (
    <div className="filterDiv">
      {chosenList.length > 0 &&
        chosenList.map((elem, index) => {
          return (
            <p key={`chosenP-${index}`} className="filterPChosen">
              {elem.value}
            </p>
          );
        })}
      <input type="text" value={text} onChange={changeList} />
      {list.map((elem) => {
        let chosenElem = chosenList.find((item) => item.id == elem._id);
        let checked = "";
        if (chosenElem) checked = "checked";
        return (
          <div key={elem._id}>
            <p className="filterP">
              <input
                type="checkbox"
                value={elem._id}
                name={elem.value}
                checked={checked}
                onChange={choiseValue}
              />
              {elem.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};
