import React, { useEffect, useState } from "react";
import "./filterTd.sass";

export const FilterDateListTd = (props) => {
  const [showList, setShowList] = useState(false);
  const [listIdValue, setListIdValue] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [text, setText] = useState("");
  const [btnText, setBtnText] = useState("Очистить всё");
  const [classFilterTdDiv, setClassFilterTdDiv] = useState("filterTdDiv");
  const [color, setColor] = useState("Black");
  const [dateYears, setDateYears] = useState([]);
  const [openedYears, setOpenedYears] = useState([]);
  const [openedMonthYear, setOpenedMonthYear] = useState([]);

  useEffect(() => {
    let isChosen = props.listId.findIndex((elem) => elem.checked == false);
    if (isChosen != -1) {
      setColor("Blue");
    } else {
      setColor("Black");
    }
    setListIdValue(props.listId);
    setFilteredList(props.listId);
  }, [props.listId]);
  useEffect(() => {
    let dateList = props.listId;
    let yearsList = [];
    dateList.forEach((dateObj) => {
      let date = new Date(dateObj.value);
      let year = date.getFullYear();
      if (!yearsList.includes(year)) yearsList.push(year);
    });
    setDateYears(yearsList);
  }, [props]);

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
    console.log(filteredList);
    setShowList(false);
  };
  const getMonthsInYear = (year) => {
    let months = [];
    let dateList = props.listId;
    dateList.forEach((dateObj) => {
      let date = new Date(dateObj.value);
      if (date.getFullYear() == year) {
        let month = date.getMonth();
        if (!months.includes(month)) {
          months.push(month);
        }
      }
    });
    return months;
  };
  const handleClickYearPlus = (year) => {
    let arr = [...openedYears];
    if (!arr.includes(year)) {
      arr.push(year);
    } else {
      arr = openedYears.filter((elem) => elem != year);
    }
    setOpenedYears(arr);
  };
  const monthWord = (numberOfMonth) => {
    switch (numberOfMonth) {
      case 0:
        return "Январь";
      case 1:
        return "Февраль";
      case 2:
        return "Март";
      case 3:
        return "Апрель";
      case 4:
        return "Май";
      case 5:
        return "Июнь";
      case 6:
        return "Июль";
      case 7:
        return "Август";
      case 8:
        return "Сентябрь";
      case 9:
        return "Октябрь";
      case 10:
        return "Ноябрь";
      case 11:
        return "Декабрь";
      default:
        break;
    }
  };
  const getDaysInMonth = (year, month) => {
    let days = [];
    let dateList = props.listId;
    dateList.forEach((dateObj) => {
      let date = new Date(dateObj.value);
      if (date.getFullYear() == year && date.getMonth() == month) {
        let day = date.getDate();
        if (!days.includes(day)) days.push(day);
      }
    });
    return days;
  };
  const handleClickMonthPlus = (year, month) => {
    let arr = [...openedMonthYear];
    if (!arr.includes(`${year}-${month}`)) {
      arr.push(`${year}-${month}`);
    } else {
      arr = openedMonthYear.filter((elem) => elem != `${year}-${month}`);
    }
    setOpenedMonthYear(arr);
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
            {dateYears.map((elemYear) => {
              let months = getMonthsInYear(elemYear);
              console.log(months);
              return (
                <div key={`YearDiv${elemYear}`}>
                  <span onClick={() => handleClickYearPlus(elemYear)}>
                    {openedYears.includes(elemYear) ? "-" : "+"}
                  </span>
                  <input type="checkbox" />
                  {elemYear}
                  {openedYears.includes(elemYear) && (
                    <div>
                      {months.map((elemMonth) => {
                        let days = getDaysInMonth(elemYear, elemMonth);
                        return (
                          <div key={`monthDiv${elemYear}-${elemMonth}`}>
                            <span
                              onClick={() =>
                                handleClickMonthPlus(elemYear, elemMonth)
                              }
                            >
                              {openedMonthYear.includes(
                                `${elemYear}-${elemMonth}`
                              )
                                ? "-"
                                : "+"}
                            </span>
                            <input type="checkbox" />
                            {monthWord(elemMonth)}
                            {openedMonthYear.includes(
                              `${elemYear}-${elemMonth}`
                            ) &&
                              days.map((elemDay) => {
                                return (
                                  <div
                                    key={`dayDiv${elemYear}-${elemMonth}-${elemDay}`}
                                  >
                                    <input type="checkbox" />
                                    {elemDay}
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
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
