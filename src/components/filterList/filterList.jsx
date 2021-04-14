import React, { useEffect, useState } from "react";
import "./filterList.sass";

export const FilterList = (props) => {
  const [text, setText] = useState("");
  const [list, setList] = useState(props.arrlist);
  const [chosenList, setChosenList] = useState(props.filterList);

  useEffect(() => {
    let arr = props.filterList.map((elem) => {
      let value = list.find((item) => item._id == elem);
      return { id: elem, value: value.value };
    });
    setChosenList(arr);
  }, [props.filterList]);

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
    let check = arr.findIndex((elem) => elem.id == e.target.value);
    if (check >= 0) {
      arr.splice(check, 1);
    } else {
      arr.push({ id: e.target.value, value: e.target.name });
    }
    setChosenList(arr);
  };
  const handleClickP = (e) => {
    if (e.target.localName == "p") {
      e.target.children[0].checked = !e.target.children[0].checked;
      let [...arr] = chosenList;
      let check = arr.findIndex(
        (elem) => elem.id === e.target.children[0].value
      );
      if (check >= 0) {
        arr.splice(check, 1);
      } else {
        arr.push({
          id: e.target.children[0].value,
          value: e.target.children[0].name,
        });
      }
      setChosenList(arr);
    }
  };

  const handleClickOk = () => {
    let arr = chosenList.map((elem) => Number(elem.id));
    props.writeFilterList(arr, props.name);
    props.closeFilter();
  };

  return (
    <div className="filterDiv">
      <div className="filterDivChosenP">
        {chosenList.length > 0 &&
          chosenList.map((elem, index) => {
            return (
              <p key={`chosenP-${index}`} className="filterPChosen">
                {elem.value}
              </p>
            );
          })}{" "}
      </div>
      <input type="text" value={text} onChange={changeList} />
      <div className="filterDivList">
        {list.map((elem) => {
          let chosenElem = chosenList.find((item) => item.id == elem._id);
          let checked = "";
          if (chosenElem) checked = "checked";
          return (
            <div key={elem._id}>
              <p className="filterP" onClick={handleClickP}>
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
      <div className="filterDivBtn">
        <button onClick={handleClickOk}>Ok</button>
        <button>Clear</button>
      </div>
    </div>
  );
};
