import React, { useEffect, useState } from "react";
import "./filterDateList.sass";

export const FilterDateList = (props) => {
  const [years, setYears] = useState([]);
  const [shownYears, setShownYears] = useState([]);
  const [shownMonths, setShownMonths] = useState([]);
  const [chosenYear, setChosenYear] = useState(null);

  useEffect(() => {
    let arr = [];
    for (let elem of props.arrlist) {
      let date = new Date(elem.date);
      let year = date.getFullYear();
      if (!arr.includes(year)) {
        arr.push(year);
      }
    }
    setYears(arr.reverse());
  }, [props.arrlist]);

  const handlePlusYearClick = (e) => {
    let [...arrYear] = shownYears;
    let year = Number(e.target.name);
    if (e.target.innerText == "+") {
      arrYear.push(year);
    } else {
      arrYear = shownYears.filter((item) => item != year);
    }
    setShownYears(arrYear);
    if (e.target.innerText == "+") {
      e.target.innerText = "-";
    } else {
      e.target.innerText = "+";
    }
  };

  const handlePlusMonthClick = (e) => {
    let [...arrMonths] = shownMonths;
    let month = e.target.name;
    if (e.target.innerText == "+") {
      arrMonths.push(month);
    } else {
      arrMonths = shownMonths.filter((item) => item != month);
    }
    setShownMonths(arrMonths);
    console.log(shownMonths);
    if (e.target.innerText == "+") {
      e.target.innerText = "-";
    } else {
      e.target.innerText = "+";
    }
  };

  const nameOfMonth = (numberOfMonth) => {
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

  const handleChangeYear = (e) => {
    e.currentTarget.checked = !e.currentTarget.checked;
  };
  const handleChangeMonth = (e) => {
    e.currentTarget.checked = !e.currentTarget.checked;
  };
  const handleChangeDay = (e) => {
    e.currentTarget.checked = !e.currentTarget.checked;
  };
  return (
    <div className="filterDateDiv">
      {years.map((elemYear) => {
        let months = [];
        props.arrlist.forEach((elem) => {
          let date = new Date(elem.date);
          if (date.getFullYear() == elemYear) {
            let month = date.getMonth();
            if (!months.includes(month)) {
              months.push(month);
            }
          }
        });
        return (
          <div key={`Year${elemYear}`} name={elemYear} className="felterStrDiv">
            <button
              onClick={handlePlusYearClick}
              name={elemYear}
              className="filterBtnPlus"
            >
              +
            </button>
            <p className="filterP">
              <input type="checkbox" onChange={handleChangeYear} />
              {elemYear}
            </p>
            {shownYears.includes(elemYear) && (
              <div className="felterMonthDiv">
                {months.map((elemMonth) => {
                  let days = [];
                  props.arrlist.forEach((elem) => {
                    let date = new Date(elem.date);
                    if (
                      date.getFullYear() == elemYear &&
                      date.getMonth() == elemMonth
                    ) {
                      let day = date.getDate();
                      if (!days.includes(day)) {
                        days.push(day);
                      }
                    }
                  });
                  return (
                    <div
                      key={`${elemYear}${elemMonth}`}
                      className="felterStrDiv"
                    >
                      <button
                        onClick={handlePlusMonthClick}
                        name={`${elemYear}-${elemMonth}`}
                        className="filterBtnPlus"
                      >
                        +
                      </button>
                      <p className="filterP">
                        <input
                          type="checkbox"
                          checked="checked"
                          onChange={handleChangeMonth}
                        />
                        {nameOfMonth(elemMonth)}
                      </p>
                      {shownMonths.includes(`${elemYear}-${elemMonth}`) && (
                        <div className="filterDaysDiv">
                          {days.map((elemDay) => {
                            return (
                              <div key={`${elemYear}-${elemMonth}-${elemDay}`}>
                                <p className="filterP">
                                  <input
                                    type="checkbox"
                                    checked="checked"
                                    onChange={handleChangeDay}
                                  />
                                  {elemDay}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
