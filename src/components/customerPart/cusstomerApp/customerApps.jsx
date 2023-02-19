import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomerAppTr } from "./customerAppTr.jsx";
import { UserWindow } from "../../userWindow/userWindow.jsx";
import { CustomerCreateApp } from "../customerOrders/customerCreateApp.jsx";
import { AppCustomerDriverPart } from "./appCustomerDriverPart.jsx";
import "./customerApps.sass";

export const CustomerApps = () => {
  const dispatch = useDispatch();

  const appList = useSelector((state) => state.customerReducer.customerOrders);

  const user = useSelector((state) => state.oderReducer.currentUser);
  const [currentId, setCurrentId] = useState(null);
  const [showCreateApp, setShowCreateApp] = useState(false);
  const [dataDriver, setDataDriver] = useState(null);
  const [dataCustomer, setDataCustoner] = useState(null);

  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        setCurrentId(null);
        setShowCreateApp(false);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, []);

  const getId = (id) => {
    setCurrentId(id);
  };
  const handleClickCreateApp = () => {
    setShowCreateApp(true);
  };
  const handleClickEditWindowClose = () => {
    setShowCreateApp(false);
  };
  const getDriverData = (data) => {
    setDataDriver(data);
  };
  const getCustomerData = (data) => {
    setDataCustoner(data);
  };

  return (
    <div className="customerAppContainer">
      <menu className="customerAppMenu">
        <div className="customerAppMenuBtnContainer">
          <button className="customerAppMenuBtn" onClick={handleClickCreateApp}>
            Создать заявку
          </button>
          {currentId != null && (
            <button className="customerAppMenuBtn">Копировать заявку</button>
          )}
          {currentId != null && (
            <button className="customerAppMenuBtn">Редактировать заявку</button>
          )}
          {currentId != null && (
            <button className="customerAppMenuBtn">Удалить заявку</button>
          )}
        </div>
        <div className="customerAppMenuFilterContainer">Всякие галочки</div>
      </menu>
      <main className="customerAppMain">
        <table className="customerAppTable">
          <thead className="customerAppThead">
            <tr>
              <td className="customerAppTd">Заказчик</td>
              <td className="customerAppTd">Дата</td>
              <td className="customerAppTd">Пункты погрузки</td>
              <td className="customerAppTd">Пункты выгрузки</td>
              <td className="customerAppTd">Цена</td>
            </tr>
          </thead>
          <tbody>
            {appList.map((elem) => {
              return (
                <CustomerAppTr
                  key={`customerAppTr${elem._id}`}
                  elem={elem}
                  getId={getId}
                  currentId={currentId}
                />
              );
            })}
          </tbody>
        </table>
      </main>
      {showCreateApp && (
        <UserWindow
          header="Создание заявки"
          width={1200}
          height={700}
          top={"10px"}
          handleClickWindowClose={handleClickEditWindowClose}
          windowId="createAppWindow"
        >
          <CustomerCreateApp
            id={currentId}
            user={user}
            closeWindow={handleClickEditWindowClose}
            dataDriver={dataDriver}
            dataCustomer={dataCustomer}
          >
            <AppCustomerDriverPart
              getDriverData={getDriverData}
              getCustomerData={getCustomerData}
            />
          </CustomerCreateApp>
        </UserWindow>
      )}
    </div>
  );
};
