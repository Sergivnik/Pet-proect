import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOut } from "../../../actions/auth";
import { getCustomerData } from "../../../actions/customerOrderAdtion.js";
import "./customerOrders.sass";

export const CustomerOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerData());
  }, [dispatch]);

  const user = useSelector((state) => state.oderReducer.currentUser);

  const [currentDiv, setCurrentDiv] = useState("Tab1");
  const [content, setContent] = useState("BossContent");

  useEffect(() => {
    if (currentDiv == "Tab1") {
      if (user.role == "customerBoss") {
        setContent("BossContent");
      } else {
        setContent("TopSecret");
      }
    }
  }, [user, currentDiv]);
  const setDivStyle = (divName, role) => {
    let className = "customerOrderHeaderTab";
    if (role != "customerBoss" && divName == "Tab1") {
      className = className + " greyColor";
    }
    if (divName == currentDiv) {
      return className + " whiteBottom";
    } else {
      return className + " customerOrderHeaderTab";
    }
  };

  const handleClickExit = () => {
    dispatch(authSignOut());
  };
  const handleClickTabDiv = (divName) => {
    setCurrentDiv(divName);
    if (divName == "Tab1") setContent("BossContent");
    if (divName == "Tab2") setContent("ManagerContent");
    if (divName == "Tab3") setContent("activeContent");
  };

  return (
    <div>
      <header className="customerOrdersHeader">
        <span className="customerOrdersHeaderHeader">
          Список заказов автотранспорта
        </span>
        <span className="customerOrdersUser">{user.name}</span>
        <span className="customerOrdersExit" onClick={handleClickExit}>
          {"Выйти"}
        </span>
      </header>
      <main>
        <header className="customerOrderMainHeader">
          <div
            className={setDivStyle("Tab1", user.role)}
            onClick={() => {
              handleClickTabDiv("Tab1");
            }}
          >
            Все заказы
          </div>
          <div
            className={setDivStyle("Tab2", user.role)}
            onClick={() => {
              handleClickTabDiv("Tab2");
            }}
          >
            Мои заказы
          </div>
          <div
            className={setDivStyle("Tab3", user.role)}
            onClick={() => {
              handleClickTabDiv("Tab3");
            }}
          >
            Активные заказы
          </div>
        </header>
        <div className="customerOrdderContentDiv">{content}</div>
      </main>
    </div>
  );
};
