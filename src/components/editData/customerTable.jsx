import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomerAddTr } from "./customerAddTr.jsx";
import { CustomerTr } from "./customerTr.jsx";
import { CustomerManagerTr } from "./customerManagerTr.jsx";
import { CustomerManagerAddTr } from "./customerManagerAddTr.jsx";
import { addData, editData } from "../../actions/editDataAction.js";
import { ChoiseTwoList } from "../choiseList/choiseTwoList.jsx";
import "./editData.sass";
import { InputText } from "../myLib/inputText.jsx";

export const CustomerTable = () => {
  const dispatch = useDispatch();
  const clientListFull = useSelector((state) => state.oderReducer.clientList);
  const clientManagerFull = useSelector(
    (state) => state.oderReducer.clientmanager
  );

  const [customerList, setCustomerList] = useState(clientListFull);
  const [clientManager, setClientManager] = useState(clientManagerFull);
  const [check, setCheck] = useState(true);
  const [chosenId, setChosenId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [showAddTr, setShowAddTr] = useState(false);
  const [showManagerTable, setShowManagerTable] = useState(false);
  const [showAddManagerTr, setShowAddManagerTr] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [reset, setReset] = useState(false);

  const setValue = (data) => {
    let arr = clientListFull.filter((elem) => elem._id == data._id);
    let arrManager = clientManagerFull.filter(
      (elem) => elem.odersId == data._id
    );
    setCustomerList(arr);
    setChosenId(data._id);
    setShowManagerTable(true);
    setClientManager(arrManager);
    console.log(data);
    let manager = arrManager.find((manager) => manager.phone == data.value);
    if (manager) setCurrentId(manager._id);
  };
  const handleChangeBox = (e) => {
    if (e.currentTarget.checked) {
      let [...arr] = clientListFull;
      setCheck(true);
      setCustomerList(arr.filter((elem) => elem.active == 1));
    } else {
      setCustomerList(clientListFull);
      setCheck(false);
    }
  };
  const getCurrentId = (id) => {
    setCurrentId(id);
  };
  const handleClickAdd = () => {
    setShowAddTr(true);
  };
  const handleAddCustomer = (data) => {
    dispatch(addData(data, "oders"));
    setShowAddTr(false);
  };
  const handleClickClear = () => {
    setChosenId(null);
    setReset(true);
    setShowManagerTable(false);
    if (check) {
      setCustomerList(clientListFull.filter((elem) => elem.active == 1));
    } else {
      setCustomerList(clientListFull);
    }
  };
  const handleClickAddManager = () => {
    setShowAddManagerTr(true);
  };
  const handleAddManager = (data) => {
    dispatch(addData(data, "clientmanager"));
    setShowAddManagerTr(false);
  };
  const handleChangeAddInfo = (e) => {
    e.preventDefault();
    setShowInput(true);
    console.log(customerList[0]);
  };
  const getAddInfo = (name, text) => {
    let obj = { ...customerList[0] };
    obj.addInfo = text;
    dispatch(editData(obj, "oders"));
    console.log(obj);
    setShowInput(false);
  };

  useEffect(() => {
    let [...arr] = clientListFull.filter((elem) => elem.active == 1);
    setCustomerList(arr);
  }, []);
  useEffect(() => {
    if (chosenId != null) {
      let arr = clientListFull.filter((elem) => elem._id == chosenId);
      setCustomerList(arr);
    } else {
      if (check) {
        setCustomerList(clientListFull.filter((elem) => elem.active == 1));
      } else {
        setCustomerList(clientListFull);
      }
    }
  }, [clientListFull]);
  useEffect(() => {
    setReset(false);
  }, [reset]);
  useEffect(() => {
    if (showManagerTable) {
      let [...arr] = clientManagerFull.filter(
        (elem) => elem.odersId == chosenId
      );
      setClientManager(arr);
    }
  }, [clientManagerFull]);
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        if (showInput) {
          setShowInput(false);
        } else {
          setShowAddManagerTr(false);
          setShowAddTr(false);
        }
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [showInput]);

  return (
    <>
      <h2 className="customerH2">Таблица заказчиков</h2>
      <div className="customerFilter">
        <span>Заказчик</span>
        <div className="customerChoise">
          <ChoiseTwoList
            arr1={customerList}
            arr2={clientManagerFull}
            field1="phone"
            field2="phone"
            field3="value"
            fieldSearch="odersId"
            setValue={setValue}
            reset={reset}
          />
        </div>
        <button className="driverAddBtn" onClick={handleClickClear}>
          Сброс
        </button>
        <span>Активный</span>
        <input type="checkbox" onChange={handleChangeBox} checked={check} />
        <button className="driverAddBtn" onClick={handleClickAdd}>
          Добавить
        </button>
      </div>
      <div className="tableDiv">
        <table className="customerTbl">
          <thead>
            <tr>
              <td className="customerTdHeader">Название</td>
              <td className="customerTdHeader">Полное название</td>
              <td className="customerTdHeader">ИНН</td>
              <td className="customerTdHeader">Адрес</td>
              <td className="customerTdHeader">Почтовый адрес</td>
              <td className="customerTdHeader">E-mail</td>
              <td className="customerTdHeader">Телефон</td>
              <td className="customerTdHeader">Договор</td>
              <td className="customerTdHeader">Активный</td>
            </tr>
          </thead>
          <tbody className="customerTbody">
            {customerList.map((elem) => {
              return (
                <CustomerTr
                  key={"customer" + elem._id}
                  elem={elem}
                  getCurrentId={getCurrentId}
                  currentId={currentId}
                />
              );
            })}
            {showAddTr && (
              <CustomerAddTr handleAddCustomer={handleAddCustomer} />
            )}
          </tbody>
        </table>
        {showManagerTable && (
          <div className="tableDiv">
            <header className="managerHeader">
              <div className="divAddInfo">
                <span className="spanAddInfo">{"Особые условия "}</span>
                {!showInput && (
                  <span
                    className="spanAddInfoInput"
                    onDoubleClick={handleChangeAddInfo}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  >{` ${
                    customerList[0].addInfo ? customerList[0].addInfo : ""
                  }`}</span>
                )}
                {showInput && (
                  <InputText
                    name="addInfo"
                    typeInput="text"
                    className="inputAddInfo"
                    text={
                      customerList[0].addInfo ? customerList[0].addInfo : ""
                    }
                    getText={getAddInfo}
                  />
                )}
              </div>
              <button className="managerAddBtn" onClick={handleClickAddManager}>
                Добавить Сотрудника
              </button>
            </header>
            <table className="managerTbl">
              <thead>
                <tr>
                  <td className="customerManagerTdHeader">Имя</td>
                  <td className="customerManagerTdHeader">ФИО</td>
                  <td className="customerManagerTdHeader">Телефон</td>
                  <td className="customerManagerTdHeader">e-mail</td>
                  <td className="customerManagerTdHeader">Клиент</td>
                </tr>
              </thead>
              <tbody className="customerManagerTbody">
                {clientManager.map((elem) => {
                  return (
                    <CustomerManagerTr
                      key={"customerManager" + elem._id}
                      elem={elem}
                      getCurrentId={getCurrentId}
                      currentId={currentId}
                    />
                  );
                })}
                {showAddManagerTr && (
                  <CustomerManagerAddTr
                    handleAddManager={handleAddManager}
                    customerId={chosenId}
                  />
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
