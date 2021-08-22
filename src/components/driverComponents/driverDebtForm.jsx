import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DriverDebtTr } from "./driverDebtTr.jsx";
import { DriverDebtCreate } from "./driverDebtCreate.jsx";
import { FilterDateList } from "../filterDate/filterDateList.jsx";
import { FilterList } from "../filterList/filterList.jsx";
import {
  getDataDriverDebt,
  addDataDriverDebt,
  delDataDriverDebt,
} from "../../actions/driverActions.js";
import "./driverForms.sass";

export const DriverDebtForm = () => {
  function compareNumeric(a, b) {
    if (Number(a) > Number(b)) return 1;
    if (Number(a) == Number(b)) return 0;
    if (Number(a) < Number(b)) return -1;
  }
  const categoryList = [
    { _id: 1, value: "Топливо" },
    { _id: 2, value: "Проценты" },
    { _id: 3, value: "Пинк" },
    { _id: 4, value: "Аванс" },
    { _id: 5, value: "Прочее" },
  ];
  const dispatch = useDispatch();
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const driverDebtList = useSelector(
    (state) => state.oderReducer.driverDebtList
  );

  const [filteredDriverDebtList, setFilteredDrivrDebtList] =
    useState(driverDebtList);
  const [showCreateDebt, setShowCreateDebt] = useState(false);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [dataNewDebt, setDataNewDebt] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const [colNumber, setColNumber] = useState(null);
  const [dateList, setDateList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [categoryFilterList, setCategoryFilterList] = useState([]);
  const [fullSumList, setFullSumList] = useState([]);
  const [sumList, setSumList] = useState([]);
  const fullStatusList = [
    { _id: 1, value: "Ок" },
    { _id: 2, value: "нет" },
    { _id: 3, value: "частично" },
  ];
  const [statusList, setStatusList] = useState([]);
  const [filterList, setFilterList] = useState({
    date: [],
    driver: [],
    category: [],
    sumOfDebt: [],
    statusOfDebt: [],
  });

  useEffect(() => {
    dispatch(getDataDriverDebt());
  }, [dispatch]);

  useEffect(() => {
    setFilteredDrivrDebtList(driverDebtList);
  }, [driverDebtList]);

  useEffect(() => {
    let div = document.getElementsByClassName("driverDebtTableDiv")[0];
    div.scrollTop = div.scrollHeight;
  }, [filteredDriverDebtList]);

  useEffect(() => {
    if (
      filterList.date.length == 0 &&
      filterList.driver.length == 0 &&
      filterList.category.length == 0 &&
      filterList.sumOfDebt.length == 0 &&
      filterList.statusOfDebt.length == 0
    ) {
      let arrDate = [];
      let arrDriverId = [];
      let arrCategory = [];
      let arrSum = [];
      let arrStatus = [];
      driverDebtList.forEach((elem) => {
        if (!arrDate.includes(elem.date)) arrDate.push(elem.date);
        if (!arrDriverId.includes(elem.idDriver))
          arrDriverId.push(elem.idDriver);
        if (!arrCategory.includes(elem.category))
          arrCategory.push(elem.category);
        if (!arrSum.includes(elem.sumOfDebt)) arrSum.push(elem.sumOfDebt);
        if (!arrStatus.includes(elem.debtClosed))
          arrStatus.push(elem.debtClosed);
      });
      let arrObj = [];
      arrDate.forEach((elem) => {
        arrObj.push({ date: elem });
      });
      setDateList(arrObj);
      arrObj = [];
      arrDriverId.forEach((elem) => {
        let obj = driversList.find((item) => item._id == elem);
        arrObj.push(obj);
      });
      setDriverList(arrObj);
      arrObj = [];
      arrCategory = arrCategory.sort();
      arrCategory.forEach((elem) => {
        if (elem != null) {
          let obj = categoryList.find((item) => item.value == elem);
          arrObj.push(obj);
        } 
      });
      setCategoryFilterList(arrObj);
      arrObj = [];
      let i = 1;
      arrSum = arrSum.sort(compareNumeric);
      arrSum.forEach((elem) => {
        let obj = { _id: i, value: elem };
        i++;
        arrObj.push(obj);
      });
      setFullSumList(arrObj);
      setSumList(arrObj);
      arrObj = [];
      arrStatus.forEach((elem) => {
        let obj = fullStatusList.find((item) => item.value == elem);
        arrObj.push(obj);
      });
      setStatusList(arrObj);
      setFilteredDrivrDebtList(driverDebtList);
    } else {
      let arrDate = [],
        arrDriver = [],
        arrCategory = [],
        arrSum = [],
        arrStatus = [];
      let arrList = driverDebtList.filter((elem) => {
        let checkDate = false,
          checkDriver = false,
          checkCategory = false,
          checkSum = false,
          checkStatus = false;
        if (filterList.date.length != 0) {
          filterList.date.forEach((dateTxt) => {
            let dateFromList = new Date(elem.date);
            let dateFromFilter = new Date(dateTxt);
            if (dateFromList - dateFromFilter == 0) checkDate = true;
          });
        } else checkDate = true;
        if (filterList.driver.length != 0) {
          filterList.driver.forEach((driverId) => {
            if (elem.idDriver == driverId) checkDriver = true;
          });
        } else checkDriver = true;
        if (filterList.category.length != 0) {
          filterList.category.forEach((categoryId) => {
            let categoryValue = categoryList.find(
              (item) => item._id == categoryId
            );
            if (categoryValue.value == elem.category) checkCategory = true;
          });
        }else checkCategory = true;
        if (filterList.sumOfDebt.length != 0) {
          filterList.sumOfDebt.forEach((sumId) => {
            let sumValue = fullSumList.find((item) => item._id == sumId);
            if (sumValue.value == elem.sumOfDebt) checkSum = true;
          });
        } else checkSum = true;
        if (filterList.statusOfDebt.length != 0) {
          filterList.statusOfDebt.forEach((statusId) => {
            let statusValue = fullStatusList.find(
              (item) => item._id == statusId
            );
            if (statusValue.value == elem.debtClosed) checkStatus = true;
          });
        } else checkStatus = true;
        if (
          checkDriver &&
          checkCategory &&
          checkSum &&
          checkStatus &&
          !arrDate.includes(elem.date)
        ) {
          arrDate.push(elem.date);
        }
        if (
          checkDate &&
          checkCategory &&
          checkSum &&
          checkStatus &&
          !arrDriver.includes(elem.idDriver)
        ) {
          arrDriver.push(elem.idDriver);
        }
        if (
          checkDate &&
          checkDriver &&
          checkSum &&
          checkStatus &&
          !arrCategory.includes(elem.category)
        ) {
          arrCategory.push(elem.category);
        }
        if (
          checkDate &&
          checkDriver &&
          checkCategory &&
          checkStatus &&
          !arrSum.includes(elem.sumOfDebt)
        ) {
          arrSum.push(elem.sumOfDebt);
        }
        if (
          checkDate &&
          checkDriver &&
          checkCategory &&
          checkSum &&
          !arrStatus.includes(elem.debtClosed)
        ) {
          arrStatus.push(elem.debtClosed);
        }
        if (
          checkDate &&
          checkDriver &&
          checkCategory &&
          checkSum &&
          checkStatus
        )
          return elem;
      });
      let arrObj = [];
      arrDate.forEach((elem) => {
        arrObj.push({ date: elem });
      });
      setDateList(arrObj);
      arrObj = [];
      arrDriver.forEach((elem) => {
        let obj = driversList.find((item) => item._id == elem);
        arrObj.push(obj);
      });
      setDriverList(arrObj);
      arrObj = [];
      arrCategory = arrCategory.sort();
      arrCategory.forEach((elem) => {
        if (elem != null) {
          let obj = categoryList.find((item) => item.value == elem);
          arrObj.push(obj);
        } 
      });
      setCategoryFilterList(arrObj);
      arrObj = [];
      let i = 1;
      arrSum = arrSum.sort(compareNumeric);
      arrSum.forEach((elem) => {
        let obj = { _id: i, value: elem };
        i++;
        arrObj.push(obj);
      });
      setSumList(arrObj);
      arrObj = [];
      arrStatus.forEach((elem) => {
        let obj = fullStatusList.find((item) => item.value == elem);
        arrObj.push(obj);
      });
      setStatusList(arrObj);
      setFilteredDrivrDebtList(arrList);
    }
  }, [filterList, driverDebtList]);

  const handleClickBtn = () => {
    setShowCreateDebt(!showCreateDebt);
    setShowSaveBtn(!showSaveBtn);
  };
  const sentDebt = (data) => {
    if (data.idDebtClosed == null) {
      data.idDebtClosed = 2;
      data.debtClosedValue = "нет";
    }
    setDataNewDebt(data);
  };
  const handleClickSaveBtn = () => {
    dispatch(addDataDriverDebt(dataNewDebt));
    setShowCreateDebt(!showCreateDebt);
    setShowSaveBtn(!showSaveBtn);
  };
  const handleCliclTr = (id) => {
    if (id) {
      setShowDeleteBtn(true);
    } else {
      setShowDeleteBtn(false);
    }
    setDeleteId(id);
  };
  const handleClickDeleteBtn = () => {
    setShowDeleteBtn(false);
    dispatch(delDataDriverDebt(deleteId));
  };

  const handleClickFilter = (e) => {
    setShowFilter(true);
    setColNumber(e.currentTarget.parentElement.cellIndex);
  };
  const closeFilter = () => setShowFilter(false);
  const writeFilterList = (chosenList, name) => {
    let { ...arr } = filterList;
    switch (name) {
      case "Date":
        chosenList = chosenList.map((elem) => {
          let arrdate = elem.split("-");
          return `${arrdate[0]}-${Number(arrdate[1]) + 1}-${arrdate[2]}`;
        });
        arr.date = chosenList;
        setFilterList(arr);
        break;
      case "driver":
        arr.driver = chosenList;
        setFilterList(arr);
        break;
      case "category":
        arr.category = chosenList;
        setFilterList(arr);
        break;
      case "sum":
        arr.sumOfDebt = chosenList;
        setFilterList(arr);
        break;
      case "status":
        arr.statusOfDebt = chosenList;
        setFilterList(arr);
        break;
      default:
        break;
    }
  };

  return (
    <div className="driverDebtMainDiv">
      <div className="driverDebtTableDiv">
        <table className="driverDebtMainTable">
          <thead className="driverDebtMainHeader">
            <tr className="driverDebtMainHeaderTr">
              <td className="driverDebtMainHeaderTd">
                <span>Дата</span>
                <button
                  className="customerPaymentHeaderFilter"
                  onClick={handleClickFilter}
                >
                  <svg width="100%" height="20">
                    <polygon
                      points="5 5, 25 5, 15 15, 5 5 "
                      fill={filterList.date.length > 0 ? "blue" : "black"}
                    />
                  </svg>
                </button>
                {showFilter && colNumber === 0 && (
                  <FilterDateList
                    name="Date"
                    arrlist={dateList}
                    filterList={filterList.date}
                    closeFilter={closeFilter}
                    writeFilterList={writeFilterList}
                  />
                )}
              </td>
              <td className="driverDebtMainHeaderTd">
                <span>Перевозчик</span>
                <button
                  className="customerPaymentHeaderFilter"
                  onClick={handleClickFilter}
                >
                  <svg width="100%" height="20">
                    <polygon
                      points="5 5, 25 5, 15 15, 5 5 "
                      fill={filterList.driver.length > 0 ? "blue" : "black"}
                    />
                  </svg>
                </button>
                {showFilter && colNumber === 1 && (
                  <FilterList
                    name="driver"
                    arrlist={driverList}
                    filterList={filterList.driver}
                    closeFilter={closeFilter}
                    writeFilterList={writeFilterList}
                  />
                )}
              </td>
              <td className="driverDebtMainHeaderTd">
                <span>Категория</span>
                <button
                  className="customerPaymentHeaderFilter"
                  onClick={handleClickFilter}
                >
                  <svg width="100%" height="20">
                    <polygon
                      points="5 5, 25 5, 15 15, 5 5 "
                      fill={filterList.category.length > 0 ? "blue" : "black"}
                    />
                  </svg>
                </button>
                {showFilter && colNumber === 2 && (
                  <FilterList
                    name="category"
                    arrlist={categoryFilterList}
                    filterList={filterList.category}
                    closeFilter={closeFilter}
                    writeFilterList={writeFilterList}
                  />
                )}
              </td>
              <td className="driverDebtMainHeaderTd">
                <span>Сумма</span>
                <button
                  className="customerPaymentHeaderFilter"
                  onClick={handleClickFilter}
                >
                  <svg width="100%" height="20">
                    <polygon
                      points="5 5, 25 5, 15 15, 5 5 "
                      fill={filterList.sumOfDebt.length > 0 ? "blue" : "black"}
                    />
                  </svg>
                </button>
                {showFilter && colNumber === 3 && (
                  <FilterList
                    name="sum"
                    arrlist={sumList}
                    filterList={filterList.sumOfDebt}
                    closeFilter={closeFilter}
                    writeFilterList={writeFilterList}
                  />
                )}
              </td>
              <td className="driverDebtMainHeaderTd">Примечание</td>
              <td className="driverDebtMainHeaderTd">
                <span>Долг закрыт</span>
                <button
                  className="customerPaymentHeaderFilter"
                  onClick={handleClickFilter}
                >
                  <svg width="100%" height="20">
                    <polygon
                      points="5 5, 25 5, 15 15, 5 5 "
                      fill={
                        filterList.statusOfDebt.length > 0 ? "blue" : "black"
                      }
                    />
                  </svg>
                </button>
                {showFilter && colNumber === 5 && (
                  <FilterList
                    name="status"
                    arrlist={statusList}
                    filterList={filterList.statusOfDebt}
                    closeFilter={closeFilter}
                    writeFilterList={writeFilterList}
                  />
                )}
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredDriverDebtList.map((elem) => {
              return (
                <DriverDebtTr
                  key={elem.id}
                  debtData={elem}
                  handleCliclTr={handleCliclTr}
                  deleteId={deleteId}
                  categoryList={categoryList}
                  fullStatusList={fullStatusList}
                />
              );
            })}
            {showCreateDebt && (
              <DriverDebtCreate
                key="tempIdKey"
                driversList={driversList}
                sentDebt={sentDebt}
                categoryList={categoryList}
              />
            )}
          </tbody>
        </table>
      </div>
      {showSaveBtn ? (
        <button className="driverDebtBtn" onClick={handleClickSaveBtn}>
          Сохранить
        </button>
      ) : (
        <button className="driverDebtBtn" onClick={handleClickBtn}>
          Добавить
        </button>
      )}
      {showDeleteBtn && (
        <button className="driverDebtBtn" onClick={handleClickDeleteBtn}>
          Удалить
        </button>
      )}
    </div>
  );
};
