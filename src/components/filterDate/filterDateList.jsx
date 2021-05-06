import React, { useEffect, useState } from "react";
import "./filterDateList.sass";

export const FilterDateList = (props) => {
  const [years, setYears] = useState([]);
  const [shownYears, setShownYears] = useState([]);
  const [shownMonths, setShownMonths] = useState([]);
  const [chosenYears, setChosenYears] = useState([]);
  const [chosenMonths, setChosenMonths] = useState([]);
  const [chosenDays, setChosenDays] = useState([]);

  useEffect(() => {
    let arr = [];
    let arrLocalDate = [];
    for (let elem of props.arrlist) {
      let date = new Date(elem.date);
      let year = date.getFullYear();
      if (!arr.includes(year)) {
        arr.push(year);
      }
    }
    setYears(arr.reverse());
    let arrdate = [];
    let localDate = "";
    arrLocalDate = props.filterList.map((elem) => {
      arrdate = elem.split("-");
      localDate = `${arrdate[0]}-${Number(arrdate[1]) - 1}-${arrdate[2]}`;
      return localDate;
    });
    setChosenDays(arrLocalDate);
  }, [props.arrlist, props.filterList]);

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
    let [...arrYear] = chosenYears;
    let [...arrMpnths] = chosenMonths;
    let [...arrDays] = chosenDays;
    let Year = Number(e.currentTarget.name);
    let Months = getMonthsInYear(Year);
    if (e.currentTarget.checked) {
      arrYear.push(Year);
      Months.forEach((elem) => {
        arrMpnths.push(`${Year}-${elem}`);
        props.arrlist.forEach((elem) => {
          let date = new Date(elem.date);
          if (date.getFullYear() == Year) {
            if (
              !arrDays.includes(
                `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
              )
            ) {
              arrDays.push(
                `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
              );
            }
          }
        });
      });
    } else {
      arrYear = chosenYears.filter((elem) => elem != Year);
      arrMpnths = chosenMonths.filter((elem) => elem.indexOf(`${Year}`));
      arrDays = chosenDays.filter((elem) => elem.indexOf(`${Year}`));
    }
    setChosenYears(arrYear);
    setChosenMonths(arrMpnths);
    setChosenDays(arrDays);
    e.currentTarget.checked = !e.currentTarget.checked;
  };

  const handleChangeMonth = (e) => {
    let [...arrMonths] = chosenMonths;
    let [...arrDays] = chosenDays;
    let Month = e.currentTarget.name;
    if (e.currentTarget.checked) {
      arrMonths.push(Month);
      props.arrlist.forEach((elem) => {
        let date = new Date(elem.date);
        if (`${date.getFullYear()}-${date.getMonth()}` == Month) {
          if (
            !arrDays.includes(
              `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            )
          ) {
            arrDays.push(
              `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            );
          }
        }
      });
    } else {
      arrMonths = chosenMonths.filter((elem) => elem != Month);
      arrDays = chosenDays.filter((elem) => elem.indexOf(`${Month}`));
    }
    setChosenMonths(arrMonths);
    setChosenDays(arrDays);
    e.currentTarget.checked = !e.currentTarget.checked;
  };

  const handleChangeDay = (e) => {
    let [...arr] = chosenDays;
    let day = e.currentTarget.name;
    if (e.currentTarget.checked) {
      let date = new Date(day);
      console.log(date);
      arr.push(day);
    } else {
      arr = chosenDays.filter((elem) => elem != day);
    }
    setChosenDays(arr);
    console.log(arr);
    e.currentTarget.checked = !e.currentTarget.checked;
  };

  const handleClickOk = () => {
    console.log(chosenDays);
    props.writeFilterList(chosenDays, "Date");
    props.closeFilter();
  };

  const handleClickClear = () => {
    setChosenYears([]);
    setChosenMonths([]);
    setChosenDays([]);
  };

  const getMonthsInYear = (Year) => {
    let months = [];
    props.arrlist.forEach((elem) => {
      let date = new Date(elem.date);
      if (date.getFullYear() == Year) {
        let month = date.getMonth();
        if (!months.includes(month)) {
          months.push(month);
        }
      }
    });
    return months;
  };

  const isIncludeYear = (CheckYear) => {
    let check = false;
    chosenDays.forEach((elem) => {
      if (elem.indexOf(CheckYear) == 0) {
        check = true;
      }
    });
    return check;
  };

  return (
    <div className="filterDateDiv">
      <div className="filterYearsDiv">
        {years.map((elemYear) => {
          let months = getMonthsInYear(elemYear);
          return (
            <div
              key={`Year${elemYear}`}
              name={elemYear}
              className="filterStrDiv"
            >
              <div className="filterBtnP">
                <button
                  onClick={handlePlusYearClick}
                  name={elemYear}
                  className="filterBtnPlus"
                >
                  +
                </button>
                <p
                  className={
                    isIncludeYear(elemYear) ? "filterP ColorP" : "filterP"
                  }
                >
                  <input
                    type="checkbox"
                    onChange={handleChangeYear}
                    name={elemYear}
                    checked={chosenYears.includes(elemYear)}
                  />
                  {elemYear}
                </p>
              </div>
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
                        <div className="filterBtnP filterBtnMonth">
                          <button
                            onClick={handlePlusMonthClick}
                            name={`${elemYear}-${elemMonth}`}
                            className="filterBtnPlus"
                          >
                            +
                          </button>
                          <p
                            className={
                              isIncludeYear(`${elemYear}-${elemMonth}`)
                                ? "filterP ColorP"
                                : "filterP"
                            }
                          >
                            <input
                              type="checkbox"
                              checked={chosenMonths.includes(
                                `${elemYear}-${elemMonth}`
                              )}
                              name={`${elemYear}-${elemMonth}`}
                              onChange={handleChangeMonth}
                            />
                            {nameOfMonth(elemMonth)}
                          </p>
                        </div>
                        {shownMonths.includes(`${elemYear}-${elemMonth}`) && (
                          <div className="filterDaysDiv">
                            {days.map((elemDay) => {
                              return (
                                <div
                                  key={`${elemYear}-${elemMonth}-${elemDay}`}
                                  className="filterBtnDay"
                                >
                                  <p
                                    className={
                                      chosenDays.includes(
                                        `${elemYear}-${elemMonth}-${elemDay}`
                                      )
                                        ? "filterP ColorP"
                                        : "filterP"
                                    }
                                  >
                                    <input
                                      type="checkbox"
                                      checked={chosenDays.includes(
                                        `${elemYear}-${elemMonth}-${elemDay}`
                                      )}
                                      name={`${elemYear}-${elemMonth}-${elemDay}`}
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
      <div className="filterBtnOkClear">
        <button onClick={handleClickOk}>Ok</button>
        <button onClick={handleClickClear}>Clear</button>
      </div>
    </div>
  );
};
