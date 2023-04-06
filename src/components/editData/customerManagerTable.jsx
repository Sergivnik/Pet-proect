import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { CustomerManagerAddTr } from "./customerManagerAddTr.jsx";
import { CustomerManagerTr } from "./customerManagerTr.jsx";
import { addData } from "../../actions/editDataAction.js";

import "./editData.sass";

export const CustomerManagerTable = () => {
  const dispatch = useDispatch();
  const clientManagerFull = useSelector(
    (state) => state.oderReducer.clientmanager
  );
  const clientListFull = useSelector((state) => state.oderReducer.clientList);

  const [clientManager, setClientManager] = useState(clientManagerFull);
  const [clientList, setClientList] = useState(clientListFull);
  const [check, setCheck] = useState(true);
  const [chosenId, setChosenId] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [showAddTr, setShowAddTr] = useState(false);

  const setValue = (data) => {
    let arr = clientManagerFull.filter((elem) => elem.odersId == data._id);
    setClientManager(arr);
    setChosenId(data._id);
    console.log(data);
  };
  const handleChangeBox = (e) => {
    if (e.currentTarget.checked) {
      let [...arr] = clientListFull;
      setCheck(true);
      setClientList(arr.filter((elem) => elem.active == 1));
    } else {
      setClientList(clientListFull);
      setCheck(false);
    }
  };
  const getCurrentId = (id) => {
    setCurrentId(id);
  };
  const handleClickAdd = () => {
    setShowAddTr(true);
  };
  const handleAddManager = (data) => {
    console.log(data);
    dispatch(addData(data, "clientmanager"));
    setShowAddTr(false);
  };

  useEffect(() => {
    if (chosenId != null) {
      let arr = clientManagerFull.filter((elem) => elem.odersId == chosenId);
      setClientManager(arr);
    } else {
      setClientManager(clientManagerFull);
    }
    if (check) {
      setClientList(clientListFull.filter((elem) => elem.active == 1));
    } else {
      setClientList(clientListFull);
    }
  }, [clientManagerFull]);

  return (
    <>
      <h2 className="managerH2">Таблица менеджеров</h2>
      <div className="customerFilter">
        <span>Заказчик</span>
        <div className="customerChoise">
          <ChoiseList
            name="customer"
            arrlist={clientList}
            setValue={setValue}
          />
        </div>
        <span>Активный</span>
        <input type="checkbox" onChange={handleChangeBox} checked={check} />
        <button className="managerAddBtn" onClick={handleClickAdd}>
          Добавить
        </button>
      </div>
      <div className="tableDiv">
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
            {showAddTr && (
              <CustomerManagerAddTr handleAddManager={handleAddManager} />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
