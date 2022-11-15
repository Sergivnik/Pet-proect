import React, { useEffect, useState } from "react";
import "./filterTd.sass";

export const FilterDateListTd = (props) => {
  const [showList, setShowList] = useState(false);
  const [listIdValue, setListIdValue] = useState([]);
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
  }, [props.listId]);
  useEffect(() => {
    let dateList = props.listId;
    let yearsList = [];
    dateList.forEach((dateObj) => {
      let date = new Date(dateObj.value);
      let year = date.getFullYear();
      if (!yearsList.includes(year)) yearsList.push(year);
    });
    setDateYears(yearsList.reverse());
  }, [props]);

  const getText = (e) => {
    setText(e.currentTarget.value);
    let test = e.currentTarget.value;
    let regtext = new RegExp(test, "i");
    let arr = listIdValue.filter((elem) => {
      if (regtext.test(elem.value)) return elem;
    });
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
    props.getFilteredList(props.name, listIdValue);
    setShowList(false);
  };
  const getMonthsInYear = (year) => {
    let months = [];
    let dateList = listIdValue;
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
  const findDateObjIndex = (year, month, day) => {
    let currentDate = `${year}-${
      month < 10 ? `0${month + 1}` : `${month + 1}`
    }-${day < 10 ? `0${day}` : `${day}`}`;
    let index = listIdValue.findIndex(
      (dateObj) => dateObj.value == currentDate
    );
    return index;
  };
  const getDaysInMonth = (year, month) => {
    let days = [];
    let dateList = listIdValue;
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
  const handleClickDay = (year, month, day) => {
    let arr = [...listIdValue];
    let index = findDateObjIndex(year, month, day);
    arr[index].checked = !arr[index].checked;
    setListIdValue(arr);
  };
  const checkMonth = (year, month) => {
    let result = true;
    listIdValue.forEach((dateObj) => {
      let currentDate = new Date(dateObj.value);
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth();
      if (currentYear == year && currentMonth == month) {
        result = result && dateObj.checked;
      }
    });
    return result;
  };
  const checkMonthColor = (year, month) => {
    let result = false;
    listIdValue.forEach((dateObj) => {
      let currentDate = new Date(dateObj.value);
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth();
      if (currentYear == year && currentMonth == month) {
        result = result || dateObj.checked;
      }
    });
    return result;
  };
  const checkYearColor = (year) => {
    let result = false;
    listIdValue.forEach((dateObj) => {
      let currentDate = new Date(dateObj.value);
      let currentYear = currentDate.getFullYear();
      if (currentYear == year) {
        result = result || dateObj.checked;
      }
    });
    return result;
  };
  const handleChangeMonth = (year, month) => {
    let arr = [...listIdValue];
    let checked = checkMonth(year, month);
    if (checked) {
      arr.forEach((dateObj) => {
        let currentDate = new Date(dateObj.value);
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        if (currentYear == year && currentMonth == month) {
          dateObj.checked = false;
        }
      });
    } else {
      arr.forEach((dateObj) => {
        let currentDate = new Date(dateObj.value);
        let currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        if (currentYear == year && currentMonth == month) {
          dateObj.checked = true;
        }
      });
    }
    setListIdValue(arr);
  };
  const checkYear = (year) => {
    let result = true;
    listIdValue.forEach((dateObj) => {
      let currentDate = new Date(dateObj.value);
      let currentYear = currentDate.getFullYear();
      if (currentYear == year) result = result && dateObj.checked;
    });
    return result;
  };
  const handleChangeYear = (year) => {
    let arr = [...listIdValue];
    let checked = checkYear(year);
    if (checked) {
      arr.forEach((dateObj) => {
        let currentDate = new Date(dateObj.value);
        let currentYear = currentDate.getFullYear();
        if (currentYear == year) dateObj.checked = false;
      });
    } else {
      arr.forEach((dateObj) => {
        let currentDate = new Date(dateObj.value);
        let currentYear = currentDate.getFullYear();
        if (currentYear == year) dateObj.checked = true;
      });
    }
    setListIdValue(arr);
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
              return (
                <div key={`YearDiv${elemYear}`} className="divDateWrap">
                  <div
                    className="svgWraper"
                    onClick={() => handleClickYearPlus(elemYear)}
                  >
                    {openedYears.includes(elemYear) ? (
                      <svg
                        className="svgTest"
                        width="12"
                        height="12"
                        viewBox="0 0 100 100"
                      >
                        <rect
                          x="0"
                          y="43"
                          rx="7"
                          ry="7"
                          width="100"
                          height="14"
                          fill={checkYearColor(elemYear) ? "blue" : "black"}
                        />
                      </svg>
                    ) : (
                      <svg
                        className="svgTest"
                        width="12"
                        height="12"
                        viewBox="0 0 100 100"
                      >
                        <rect
                          x="43"
                          y="0"
                          rx="7"
                          ry="7"
                          width="14"
                          height="100"
                          fill={checkYearColor(elemYear) ? "blue" : "black"}
                        />
                        <rect
                          x="0"
                          y="43"
                          rx="7"
                          ry="7"
                          width="100"
                          height="14"
                          fill={checkYearColor(elemYear) ? "blue" : "black"}
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={checkYear(elemYear)}
                    onChange={() => handleChangeYear(elemYear)}
                  />
                  {elemYear}
                  {openedYears.includes(elemYear) && (
                    <div>
                      {months.map((elemMonth) => {
                        let days = getDaysInMonth(elemYear, elemMonth);
                        return (
                          <div
                            key={`monthDiv${elemYear}-${elemMonth}`}
                            className="divWrapMonth"
                          >
                            <div
                              className="svgWraper"
                              onClick={() =>
                                handleClickMonthPlus(elemYear, elemMonth)
                              }
                            >
                              {openedMonthYear.includes(
                                `${elemYear}-${elemMonth}`
                              ) ? (
                                <svg
                                  className="svgTest"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 100 100"
                                >
                                  <rect
                                    x="0"
                                    y="43"
                                    rx="7"
                                    ry="7"
                                    width="100"
                                    height="14"
                                    fill={
                                      checkMonthColor(elemYear, elemMonth)
                                        ? "blue"
                                        : "black"
                                    }
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="svgTest"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 100 100"
                                >
                                  <rect
                                    x="43"
                                    y="0"
                                    rx="7"
                                    ry="7"
                                    width="14"
                                    height="100"
                                    fill={
                                      checkMonthColor(elemYear, elemMonth)
                                        ? "blue"
                                        : "black"
                                    }
                                  />
                                  <rect
                                    x="0"
                                    y="43"
                                    rx="7"
                                    ry="7"
                                    width="100"
                                    height="14"
                                    fill={
                                      checkMonthColor(elemYear, elemMonth)
                                        ? "blue"
                                        : "black"
                                    }
                                  />
                                </svg>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={checkMonth(elemYear, elemMonth)}
                              onChange={() =>
                                handleChangeMonth(elemYear, elemMonth)
                              }
                            />
                            {monthWord(elemMonth)}
                            {openedMonthYear.includes(
                              `${elemYear}-${elemMonth}`
                            ) &&
                              days.map((elemDay) => {
                                let index = findDateObjIndex(
                                  elemYear,
                                  elemMonth,
                                  elemDay
                                );
                                let dateObj = listIdValue[index];
                                return (
                                  <div
                                    className="divWrapMonth"
                                    key={`dayDiv${elemYear}-${elemMonth}-${elemDay}`}
                                  >
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        handleClickDay(
                                          elemYear,
                                          elemMonth,
                                          elemDay
                                        )
                                      }
                                      checked={
                                        dateObj ? dateObj.checked : false
                                      }
                                    />
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
