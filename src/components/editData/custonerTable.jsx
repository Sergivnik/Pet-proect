import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { CustomerAddTr } from "./customerAddTr.jsx";
import { CustomerTr } from "./customerTr.jsx";
import { CustomerManagerTr } from "./customerManagerTr.jsx";
import { CustomerManagerAddTr } from "./customerManagerAddTr.jsx";
import { addData } from "../../actions/editDataAction.js";
import { ChoiseTwoList } from "../choiseList/choiseTwoList.jsx";
import "./editData.sass";

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

  return (
    <>
      <h2 className="customerH2">Таблица заказчиков</h2>
      <div className="customerFilter">
        <span>Заказчик</span>
        <div className="customerChoise">
          <ChoiseTwoList
            arr1={clientListFull}
            arr2={clientManagerFull}
            field1="phone"
            field2="phone"
            fieldSearch="odersId"
            setValue={setValue}
          />
          {/* <ChoiseList
            name="customer"
            arrlist={customerList}
            setValue={setValue}
            reset={reset}
          /> */}
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
