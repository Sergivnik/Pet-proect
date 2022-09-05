import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserThead } from "./userThead.jsx";
import { UserTr } from "./userTr.jsx";
import { CreateOderNew } from "../createOder/createOderNew.jsx";
import { UserWindow } from "../userWindow/userWindow.jsx";
import { CustomerPaymentForm } from "../customerPaymentForm/customerPaymentForm.jsx";
import { CustomerPayments } from "../customerPayments/customerPayments.jsx";
import { DriverPaymentForm } from "../driverComponents/driverPaymentForm.jsx";
import { DriverDebtForm } from "../driverComponents/driverDebtForm.jsx";
import { ContractorsPayments } from "../contractors/contractorsPayments.jsx";
import { getData, filterData } from "../../middlewares/initialState.js";
import { delOder } from "../../actions/oderActions.js";
import { EditDataForm } from "../editData/editDataForm.jsx";
import { PrintFormBill } from "../printForm/printFormBill.jsx";
import { BillsForm } from "../documents/billsForm.jsx";
import { Report } from "../reports/reports.jsx";
import { SpecialTable } from "../specialTable/specialTable.jsx";
import { Forecast } from "../forecast/forecast.jsx";
import "./oders.sass";
import { authSignOut } from "../../actions/auth.js";
import { ChangePassword } from "../auth/changePassword.jsx";

export const Oders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
    setShowEdit(true);
    setAddData(0);
  }, [dispatch]);

  const odersList = useSelector((state) => state.oderReducer.odersList);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const income = useSelector((state) => state.oderReducer.income);
  const expenses = useSelector((state) => state.oderReducer.expenses);
  const filteredAccountList = useSelector(
    (state) => state.oderReducer.filteredAccountList
  );
  const requestStatus = useSelector((state) => state.oderReducer.request);
  const user = useSelector((state) => state.oderReducer.currentUser);

  const [oders, setOders] = useState(odersList.slice(-1000));

  const [showCreateOder, setShowCreateOder] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showEditDataWindow, setShowEditDataWindow] = useState(false);
  const [windowHeader, setWindowHeader] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [showPrintForm, setShowPrintForm] = useState(false);
  const [showSecretTable, setShowSecretTable] = useState(false);
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);
  const [showUserWindow, setShowUserWindow] = useState(false);

  const [trId, setTrId] = useState(null);
  const [addData, setAddData] = useState(0);
  const [currentTR, setCurrentTR] = useState(null);
  const [currentElem, setCurrentElem] = useState(null);
  const [filterList, setFilterList] = useState({
    date: [],
    driver: [],
    oder: [],
    cityLoading: [],
    cityUnloading: [],
    customerPrice: [],
    driverPrice: [],
    proxy: [],
    completed: [],
    documents: [],
    customerPayment: [],
    driverPayment: [],
    accountList: [],
  });
  const [showLast, setShowLast] = useState(true);

  const [sumAccount, setSumAccount] = useState(0);
  useEffect(() => {
    console.log(requestStatus);
  }, [requestStatus]);
  useEffect(() => {
    setShowEdit(true);
    setAddData(0);
  }, []);
  useEffect(() => {
    let addSum = clientList.reduce(
      (s, item) => s + Number(item.extraPayments),
      0
    );
    let sum =
      Math.floor((Number(income) - Number(expenses) + addSum + 0.0) * 100) /
      100;
    setSumAccount(sum);
  }, [income, expenses]);

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        if (currentTR) currentTR.style.backgroundColor = "#FFF";
        setShowDelete(false);
        setShowEdit(false);
        setTrId(null);
        if (showWindow === true) {
          //setShowWindow(false);
          dispatch(filterData(filterList));
        }
      }
      if (e.ctrlKey && e.code == "KeyK") {
        e.preventDefault();
        setShowSecretTable(true);
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

  useEffect(() => {
    if (showLast) {
      let div = document.getElementsByClassName("odersDiv")[0];
      div.scrollTop = div.scrollHeight + 300;
    }
  }, [oders]);

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
      case "Completed":
        arr.completed = chosenList;
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
        let tempArr = [];
        console.log(filteredAccountList, chosenList);
        chosenList.forEach((element) => {
          tempArr.push(filteredAccountList.find((item) => item._id == element));
        });
        console.log(tempArr);
        arr.accountList = tempArr;
        setFilterList(arr);
        break;
      default:
        break;
    }
    dispatch(filterData(arr));
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
      if (addData != 0) {
        event.target.scrollTop = 1800;
      } else {
        let div = document.getElementsByClassName("odersDiv")[0];
        div.scrollTop = div.scrollHeight;
      }
    }
    if (addData != 0) setShowLast(false);
  };

  const handleClick = () => {
    let currentElem;
    if (trId != null) {
      currentElem = oders.find((elem) => elem._id == trId);
    }
    setShowCreateOder(!showCreateOder);
    setWindowWidth(1400);
    setShowWindow(true);
    setWindowHeader("Добавить заказ");
    setChildren(<CreateOderNew addOder={addOder} elem={currentElem} />);
  };

  const addOder = () => {
    setShowWindow(false);
    setShowCreateOder(false);
    setAddData(0);
    setShowLast(true);
    setTrId(null);
  };

  const getCurrentTR = (id) => {
    setTrId(id);
  };

  const handleClickTR = (event) => {
    let curTR = event.currentTarget;
    if (currentTR) currentTR.style.backgroundColor = "#FFF";
    setCurrentTR(curTR);
    if (event.target.tagName == "TD") {
      setTrId(event.currentTarget.id);
      curTR.style.backgroundColor = "#ccc";
      setShowDelete(true);
    }
    if (event.target.tagName == "P") {
      setTrId(event.currentTarget.id);
      curTR.style.backgroundColor = "#ccc";
      setShowDelete(true);
    }
  };
  const handleClickDelete = () => {
    let check = confirm("100% ?");
    if (check) {
      dispatch(delOder(trId));
      setTrId(null);
    }
  };
  const [children, setChildren] = useState(null);
  const handleClickBtnMenu = (e) => {
    setShowDropDownMenu(false);
    if (e.target.name == "dataEdit") {
      setShowEditDataWindow(true);
    }
    if (!showWindow) {
      let btnClick = e.target.name;
      if (btnClick == "customPay") {
        setWindowHeader("Оплата заказчика");
        setShowWindow(true);
        setWindowWidth(1200);
        setChildren(<CustomerPaymentForm />);
      }
      if (btnClick == "customPayments") {
        setWindowHeader("Входящие платежи");
        setShowWindow(true);
        setWindowWidth(1200);
        setChildren(<CustomerPayments />);
      }
      if (btnClick == "driverPay") {
        setWindowHeader("Оплата перевозчику");
        setShowWindow(true);
        setWindowWidth(1200);
        setChildren(<DriverPaymentForm />);
      }
      if (btnClick == "driversDebt") {
        setWindowHeader("Задолженность перевозчика");
        setShowWindow(true);
        setWindowWidth(1200);
        setChildren(<DriverDebtForm />);
      }
      if (btnClick == "otherPay") {
        setWindowHeader("Прочие расходы");
        setShowWindow(true);
        setWindowWidth(1200);
        setChildren(<ContractorsPayments />);
      }
      if (btnClick == "bill") {
        setWindowHeader("Выставление счета");
        setShowWindow(true);
        setWindowWidth(1200);
        setChildren(<BillsForm />);
      }
      if (btnClick == "reports") {
        setWindowHeader("Отчеты");
        setShowWindow(true);
        setWindowWidth(1200);
        setChildren(<Report />);
      }
    }
  };
  const handleClickWindowClose = () => {
    setShowWindow(false);
  };
  const handleClickSecretWindowClose = () => {
    setShowSecretTable(false);
  };
  const handleClickUserWindowClose = () => {
    setShowUserWindow(false);
  };
  const handleClickEditWindowClose = () => {
    setShowEditDataWindow(false);
  };
  const handleClickMainDiv = () => {
    let contextDiv = document.querySelector(".divContext");
    if (contextDiv != null) {
      contextDiv.blur();
    }
  };
  const handleClickGenerate = (elem) => {
    setCurrentElem(elem);
    console.log(elem);
    setShowPrintForm(true);
  };
  const handleClosePrintForm = () => {
    setShowPrintForm(false);
  };
  const handleClickBtnDrop = () => {
    setShowDropDownMenu(!showDropDownMenu);
  };
  const handleClickExit = () => {
    dispatch(authSignOut());
  };
  const handleClickUser = () => {
    setShowUserWindow(true);
  };
  return (
    <React.Fragment>
      <div className="odersDivInfo">
        <span className="orderDivInfoSpan">
          Рас.сч. {sumAccount.toLocaleString()} руб.
        </span>
        <Forecast />
        <div className="odersMenu">
          <button className="odersMenuBtn" onClick={handleClickBtnDrop}>
            Платежи
          </button>
          {showDropDownMenu && (
            <div className="dropDownMenu">
              <button
                name="customPay"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Поступление от поставщиков
              </button>
              <button
                name="customPayments"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Входящие платежы
              </button>
              <button
                name="driverPay"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Оплата переозчикам
              </button>
              <button
                name="otherPay"
                className="odersDropMenuBtn"
                onClick={handleClickBtnMenu}
              >
                Расходы
              </button>
            </div>
          )}

          <button
            name="driversDebt"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Долг переозчиков
          </button>

          <button
            name="bill"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Высавление счетов
          </button>
          <button
            name="dataEdit"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Внесение данных
          </button>
          <button
            name="reports"
            className="odersMenuBtn"
            onClick={handleClickBtnMenu}
          >
            Отчеты
          </button>
        </div>
        <div className="orderMenuUser">
          <span className="orderMenuUserSpan" onClick={handleClickUser}>
            {user.name}
          </span>
          <button className="orderMenuUserBtn" onClick={handleClickExit}>
            Выйти
          </button>
        </div>
      </div>
      {showWindow && (
        <UserWindow
          header={windowHeader}
          width={windowWidth}
          handleClickWindowClose={handleClickWindowClose}
          windowId="commonWindow"
        >
          {children}
        </UserWindow>
      )}
      {showPrintForm && (
        <PrintFormBill
          elem={currentElem}
          closePrintForm={handleClosePrintForm}
        />
      )}
      {showEditDataWindow && (
        <UserWindow
          header="Редактирование данных"
          width={1400}
          handleClickWindowClose={handleClickEditWindowClose}
          windowId="editDataWindow"
          top="12%"
          left="12%"
        >
          <EditDataForm />
        </UserWindow>
      )}
      {showSecretTable && (
        <UserWindow
          header="Secret Table"
          width={1400}
          handleClickWindowClose={handleClickSecretWindowClose}
          windowId="secretWindow"
        >
          <SpecialTable />
        </UserWindow>
      )}
      {showUserWindow && (
        <UserWindow
          header="Смена пароля"
          width={500}
          height={371}
          left="40%"
          top="15%"
          handleClickWindowClose={handleClickUserWindowClose}
          windowId="changePasswordWindow"
        >
          <ChangePassword />
        </UserWindow>
      )}
      <div
        className="odersDiv"
        onScroll={onScroll}
        onClick={handleClickMainDiv}
      >
        <table className="odersTable">
          <UserThead
            handleClick={handleClick}
            filterList={filterList}
            writeFilterList={writeFilterList}
            trId={trId}
          />
          <tbody className="odersTbody">
            {oders.map((elem) => {
              return (
                <UserTr
                  key={elem._id}
                  elem={elem}
                  handleClickTR={handleClickTR}
                  showEdit={showEdit}
                  showDelete={showDelete}
                  handleClickDelete={handleClickDelete}
                  trId={trId}
                  getCurrentTR={getCurrentTR}
                  handleClickGenerate={handleClickGenerate}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {requestStatus.status == "LOADING" && (
        <div className="requestStatus">Loading...</div>
      )}
    </React.Fragment>
  );
};
