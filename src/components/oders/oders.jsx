import React, { useEffect, useState } from "react";
import { UserThead } from "./userThead.jsx";
import { UserTr } from "./userTr.jsx";
import { CreateOder } from "../createOder/createOder.jsx";
import { UserWindow } from "../userWindow/userWindow.jsx";
import { CustomerPaymentForm } from "../customerPaymentForm/customerPaymentForm.jsx";
import { CustomerPayments } from "../customerPayments/customerPayments.jsx";
import { DriverPaymentForm } from "../driverPayment/form/driverPaymentForm.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getData, filterData } from "../../middlewares/initialState.js";
import { editOder, delOder, setProxy } from "../../actions/oderActions.js";
import "./oders.sass";

export const Oders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const odersList = useSelector((state) => state.oderReducer.odersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);
  const income = useSelector((state) => state.oderReducer.income);
  const expenses = useSelector((state) => state.oderReducer.expenses);

  const [oders, setOders] = useState(odersList.slice(-1000));

  const [showCreateOder, setShowCreateOder] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [windowHeader, setWindowHeader] = useState(null);

  const [trId, setTrId] = useState(null);
  const [colNumber, setColNumber] = useState(null);
  const [indexCity, setIndexCity] = useState(null);
  const [addData, setAddData] = useState(0);
  const [pId, setPId] = useState(null);
  const [currentTR, setCurrentTR] = useState(null);
  const [filterList, setFilterList] = useState({
    date: [],
    driver: [],
    oder: [],
    cityLoading: [],
    cityUnloading: [],
    customerPrice: [],
    driverPrice: [],
    proxy: [],
    complited: [],
    documents: [],
    customerPayment: [],
    driverPayment: [],
    accountList: [],
  });

  const [sumAccount, setSumAccount] = useState(0);
  useEffect(() => {
    let addSum = clientList.reduce(
      (sum, item) => sum + Number(item.extraPayments),
      0
    );
    setSumAccount(
      Math.floor((Number(income) - Number(expenses) + addSum) * 100) / 100 -
        35916024.96
    );
  }, [income, expenses]);

  const [coord, setCoord] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        if (currentTR) currentTR.style.backgroundColor = "#FFF";
        setShowDelete(false);
        setShowEdit(false);
        setShowContextMenu(false);
        if (showWindow === true) {
          setShowWindow(false);
          dispatch(filterData(filterList));
        }
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [trId, showDelete, showWindow]);

  useEffect(() => {
    let length = odersList.length;
    console.log(length);
    if (length > 100) {
      setOders(odersList.slice(length - 100 - addData, length - addData));
    } else {
      setOders(odersList);
    }
  }, [odersList, addData]);

  const writeFilterList = (chosenList, name) => {
    let { ...arr } = filterList;
    switch (name) {
      case "Date":
        arr.date = chosenList;
        setFilterList(arr);
        let arrdate = [];
        let localDate = "";
        chosenList = chosenList.map((elem) => {
          arrdate = elem.split("-");
          localDate = `${arrdate[0]}-${Number(arrdate[1]) + 1}-${arrdate[2]}`;
          return localDate;
        });
        arr.date = chosenList;
        break;
      case "Driver":
        arr.driver = chosenList;
        setFilterList(arr);
        break;
      case "Customer":
        arr.oder = chosenList;
        setFilterList(arr);
        break;
      case "LoadingCity":
        arr.cityLoading = chosenList;
        setFilterList(arr);
        break;
      case "UnloadingCity":
        arr.cityUnloading = chosenList;
        setFilterList(arr);
        break;
      case "CustomerPrice":
        arr.customerPrice = chosenList;
        setFilterList(arr);
        break;
      case "DriverPrice":
        arr.driverPrice = chosenList;
        setFilterList(arr);
        break;
      case "Proxy":
        arr.proxy = chosenList;
        setFilterList(arr);
        break;
      case "Complited":
        arr.complited = chosenList;
        setFilterList(arr);
        break;
      case "Documents":
        arr.documents = chosenList;
        setFilterList(arr);
        break;
      case "CustomerPayment":
        arr.customerPayment = chosenList;
        setFilterList(arr);
        break;
      case "DriverPayment":
        arr.driverPayment = chosenList;
        setFilterList(arr);
        break;
      case "AccountList":
        arr.accountList = chosenList;
        setFilterList(arr);
        break;
      default:
        break;
    }
    dispatch(filterData(arr));
  };

  const handleContext = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
    handleContextCity(e);
    setPId(e.target.id);
    setColNumber(e.target.parentElement.parentElement.cellIndex);
    let coordelem = e.target.parentElement.getBoundingClientRect();
    setCoord({ left: e.clientX - coordelem.x, top: e.clientY - coordelem.y });
  };

  const handleClickProxy = (e) => {
    setShowEdit(false);
    dispatch(editOder(e.target.parentElement.parentElement.id, "proxy", true));
    dispatch(setProxy(e.target.parentElement.parentElement.id));
  };
  const handleClickRadio = (e) => {
    setShowEdit(false);
    dispatch(
      editOder(trId, e.target.name, e.target.value == "yes" ? true : false)
    );
  };

  const onScroll = (event) => {
    let heightTable = event.target.children[0].clientHeight;
    let heightDiv = event.target.clientHeight;
    let length = odersList.length;
    if (event.target.scrollTop < 200) {
      if (addData < length - 110) {
        setAddData(addData + 10);
        event.target.scrollTop = 300;
      }
    }
    if (
      event.target.scrollTop > heightTable - heightDiv - 50 &&
      oders.length > 90
    ) {
      setAddData(addData - 10);
      event.target.scrollTop = 1800;
    }
  };

  const handleClick = () => setShowCreateOder(!showCreateOder);

  const addOder = () => {
    setShowCreateOder(false);
  };

  const handleContextCity = (e) => {
    if (e.target.tagName == "P") {
      setTrId(e.target.parentElement.parentElement.parentElement.id);
    }
  };

  const handleClickTR = (event) => {
    let curTR = event.currentTarget;
    if (currentTR) currentTR.style.backgroundColor = "#FFF";
    setCurrentTR(curTR);
    if (event.target.tagName == "TD") {
      setTrId(event.currentTarget.id);
      curTR.style.backgroundColor = "#ccc";
      setShowDelete(true);
      setShowAddCity(false);
    }
    if (event.target.tagName == "P") {
      setTrId(event.currentTarget.id);
      curTR.style.backgroundColor = "#ccc";
      setShowDelete(true);
      setShowAddCity(false);
    }
  };

  const handleDBLClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.localName === "td") {
      let currentTR = event.target.parentElement;
      setColNumber(event.target.cellIndex);
      currentTR.style.backgroundColor = "#fff";
    }
    if (event.target.localName === "p") {
      let currentTR = event.target.parentElement.parentElement.parentElement;
      setColNumber(event.target.parentElement.parentElement.cellIndex);
      setIndexCity(event.target.id);
      currentTR.style.backgroundColor = "#fff";
    }
    setShowDelete(false);
    setShowEdit(true);
  };

  const handleClickDelete = () => {
    dispatch(delOder(trId));
  };

  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //setShowEdit(false);
  //dispatch(editOder(trId, event.target.name, event.target.value));
  // };

  const handleEnter = (event) => {
    if (event.keyCode == 13) {
      if (
        event.target.name == "dateOfPromise" ||
        event.target.name == "sumPartPay"
      ) {
        let id = Number(
          event.target.parentElement.parentElement.parentElement.id
        );
        dispatch(editOder(id, event.target.name, event.target.value));
      } else {
        setShowEdit(false);
        dispatch(editOder(trId, event.target.name, event.target.value));
      }
    }
  };

  const setValue = (value) => {
    let data = [];
    switch (value.field) {
      case "loadingPoint":
        data = oders.find((item) => item._id == trId).idLoadingPoint;
        if (showAddCity) {
          data.push(value._id);
          setShowAddCity(false);
        } else {
          data[value.index] = value._id;
        }
        dispatch(editOder(trId, value.field, data));
        break;
      case "unloadingPoint":
        data = oders.find((item) => item._id == trId).idUnloadingPoint;
        if (showAddCity) {
          data.push(value._id);
          setShowAddCity(false);
        } else {
          data[value.index] = value._id;
        }
        dispatch(editOder(trId, value.field, data));
        break;
      default:
        dispatch(editOder(trId, value.field, value._id));
    }
    setShowEdit(false);
  };

  const handleClickAddCity = (e) => {
    e.stopPropagation();
    setShowContextMenu(false);
    setShowAddCity(true);
  };

  const hideContextMenu = () => {
    setShowContextMenu(false);
  };
  const [children, setChildren] = useState(null);
  const handleClickBtnMenu = (e) => {
    if (showWindow == false) {
      let btnClick = e.target.name;
      if (btnClick == "customPay") {
        setWindowHeader("Оплата заказчика");
        setShowWindow(true);
        setChildren(<CustomerPaymentForm />);
      }
      if (btnClick == "customPayments") {
        setWindowHeader("Входящие платежи");
        setShowWindow(true);
        setChildren(<CustomerPayments />);
      }
      if (btnClick == "driverPay") {
        setWindowHeader("Оплата перевозчику");
        setShowWindow(true);
        setChildren(<DriverPaymentForm />);
      }
      if (btnClick == "driversDebt") {
        setWindowHeader("Задолженность перевозчика");
        setShowWindow(true);
        setChildren(<DriverPaymentForm />);
      }
      if (btnClick == "otherPay") {
        setWindowHeader("Прочие расходы");
        setShowWindow(true);
        setChildren(<p>Прочие расходы</p>);
      }
    }
  };
  const handleClickWindowClose = () => {
    setShowWindow(false);
  };

  return (
    <React.Fragment>
      <div className="odersDivInfo">
        <span>Рас.сч. {sumAccount} руб.</span>
        <div className="odersMenu">
          <button
            name="customPay"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Поступление от поставщиков
          </button>
          <button
            name="customPayments"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Входящие платежы
          </button>
          <button
            name="driverPay"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Оплата переозчикам
          </button>
          <button
            name="driversDebt"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Долг переозчиков
          </button>
          <button
            name="otherPay"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Расходы
          </button>
        </div>
      </div>
      {showWindow && (
        <UserWindow
          header={windowHeader}
          handleClickWindowClose={handleClickWindowClose}
        >
          {children}
        </UserWindow>
      )}
      <div className="odersDiv" onScroll={onScroll}>
        <table className="odersTable">
          <UserThead
            handleClick={handleClick}
            filterList={filterList}
            writeFilterList={writeFilterList}
          />
          <tbody className="odersTbody">
            {oders.map((elem) => {
              let driver, customer;
              let loadingPoint,
                unloadingPoint = [];
              elem.idDriver
                ? (driver = driversList.find(
                    (item) => item._id === elem.idDriver
                  ).value)
                : (driver = "");
              elem.idCustomer
                ? (customer = clientList.find(
                    (item) => item._id === elem.idCustomer
                  ).value)
                : (customer = "");
              if (elem.idLoadingPoint) {
                loadingPoint = elem.idLoadingPoint.map((itemLP) => {
                  return citieslist.find((item) => item._id == itemLP).value;
                });
              } else {
                loadingPoint = [""];
              }
              if (elem.idUnloadingPoint) {
                unloadingPoint = elem.idUnloadingPoint.map((itemLP) => {
                  return citieslist.find((item) => item._id == itemLP).value;
                });
              } else {
                unloadingPoint = [""];
              }
              return (
                <UserTr
                  key={elem._id}
                  elem={elem}
                  handleClickTR={handleClickTR}
                  handleDBLClick={handleDBLClick}
                  showEdit={showEdit}
                  driver={driver}
                  customer={customer}
                  loadingPoint={loadingPoint}
                  unloadingPoint={unloadingPoint}
                  showDelete={showDelete}
                  handleClickDelete={handleClickDelete}
                  handleClickProxy={handleClickProxy}
                  colNumber={colNumber}
                  trId={trId}
                  handleClickRadio={handleClickRadio}
                  // handleChange={handleChange}
                  handleEnter={handleEnter}
                  setValue={setValue}
                  clientList={clientList}
                  driversList={driversList}
                  citieslist={citieslist}
                  indexCity={indexCity}
                  handleContextCity={handleContextCity}
                  showContextMenu={showContextMenu}
                  pId={pId}
                  coord={coord}
                  handleContext={handleContext}
                  handleClickAddCity={handleClickAddCity}
                  showAddCity={showAddCity}
                  hideContextMenu={hideContextMenu}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {showCreateOder && <CreateOder addOder={addOder} />}
    </React.Fragment>
  );
};
