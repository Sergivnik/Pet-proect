import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApps, getNewApp } from "../../../actions/appAction";
import { CustomerAppTr } from "./customerAppTr.jsx";
import "./customerApps.sass";

export const CustomerApps = () => {
  const dispatch = useDispatch();

  const appList = useSelector((state) => state.customerReducer.customerOrders);

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getApps());
    setInterval(() => dispatch(getNewApp()), 60000);
  }, []);
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        setCurrentId(null);
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

  return (
    <div className="customerAppContainer">
      <menu className="customerAppMenu">menu</menu>
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
    </div>
  );
};
