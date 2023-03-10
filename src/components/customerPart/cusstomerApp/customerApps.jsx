import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CustomerAppTr } from "./customerAppTr.jsx";
import { UserWindow } from "../../userWindow/userWindow.jsx";
import { CustomerCreateApp } from "../customerOrders/customerCreateApp.jsx";
import { AppCustomerDriverPart } from "./appCustomerDriverPart.jsx";
import { delCustomerApp } from "../../../actions/customerOrderAction.js";
import { AppFormExtra } from "../../documents/appFormExtra.jsx";
import "./customerApps.sass";

export const CustomerApps = () => {
  const dispatch = useDispatch();

  const appList = useSelector((state) => state.customerReducer.customerOrders);

  const user = useSelector((state) => state.oderReducer.currentUser);
  const [currentId, setCurrentId] = useState(null);
  const [showCreateApp, setShowCreateApp] = useState(false);
  const [dataDriver, setDataDriver] = useState(null);
  const [dataCustomer, setDataCustoner] = useState(null);
  const [copyApp, setCopyApp] = useState(false);
  const [showPrintApp, setShowPrintApp] = useState(false);

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
  const handleClickEditApp = () => {
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
  const handleDubleClick = () => {
    setShowCreateApp(true);
  };
  const handleClickCopy = () => {
    setCopyApp(true);
    setShowCreateApp(true);
  };
  const handlecleckDelete = () => {
    dispatch(delCustomerApp(currentId));
  };
  const handlecleckPrint = () => {
    setShowPrintApp(true);
  };
  const handlecleckCreateOrder = () => {};
  const handleClickUserWindowClose = () => {
    setShowPrintApp(false);
  };

  return (
    <div className="customerAppContainer">
      <menu className="customerAppMenu">
        <div className="customerAppMenuBtnContainer">
          {currentId == null ? (
            <button
              className="customerAppMenuBtn"
              onClick={handleClickCreateApp}
            >
              Создать заявку
            </button>
          ) : (
            <button className="customerAppMenuBtn" onClick={handleClickEditApp}>
              Редактировать заявку
            </button>
          )}
          {currentId != null && (
            <button className="customerAppMenuBtn" onClick={handleClickCopy}>
              Копировать заявку
            </button>
          )}
          {currentId != null && (
            <button className="customerAppMenuBtn" onClick={handlecleckDelete}>
              Удалить заявку
            </button>
          )}
          {currentId != null && (
            <button className="customerAppMenuBtn" onClick={handlecleckPrint}>
              Печать заявки
            </button>
          )}
          {currentId != null && (
            <button
              className="customerAppMenuBtn"
              onClick={handlecleckCreateOrder}
            >
              Создать заказ
            </button>
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
                  dubleClick={handleDubleClick}
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
            copyApp={copyApp}
          >
            <AppCustomerDriverPart
              id={currentId}
              getDriverData={getDriverData}
              getCustomerData={getCustomerData}
            />
          </CustomerCreateApp>
        </UserWindow>
      )}
      {showPrintApp && (
        <UserWindow
          header="Оформление заявки"
          width={800}
          height={800}
          left="20vw"
          top="-20px"
          handleClickWindowClose={handleClickUserWindowClose}
          windowId="fillApplication"
        >
          <AppFormExtra id={currentId} isLogistApp={true} />
        </UserWindow>
      )}
    </div>
  );
};
