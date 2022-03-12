import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { CustomerAddTr } from "./customerAddTr.jsx";
import { CustomerTr } from "./customerTr.jsx";
import { addData } from "../../actions/editDataAction.js";

import "./editData.sass";

export const CustomerTable = () => {
  const dispatch = useDispatch();
  const clientListFull = useSelector((state) => state.oderReducer.clientList);

  const [customerList, setCustomerList] = useState(clientListFull);
  const [check, setCheck] = useState(true);
  const [chosenId, setChosenId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [showAddTr, setShowAddTr] = useState(false);

  const setValue = (data) => {
    let arr = clientListFull.filter((elem) => elem._id == data._id);
    setCustomerList(arr);
    setChosenId(data._id);
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
    if (check) {
      setCustomerList(clientListFull.filter((elem) => elem.active == 1));
    } else {
      setCustomerList(clientListFull);
    }
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

  return (
    <>
      <h2 className="customerH2">Таблица заказчиков</h2>
      <div className="customerFilter">
        <span>Заказчик</span>
        <div className="customerChoise">
          <ChoiseList
            name="customer"
            arrlist={customerList}
            setValue={setValue}
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
      </div>
    </>
  );
};
