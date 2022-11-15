import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOut } from "../../../actions/auth";
import { getCustomerData } from "../../../actions/customerOrderAction.js";
import { TdDate } from "../../userTd/tdDate.jsx";
import "./customerOrders.sass";
import { CustomerTheader } from "./customerTHeader.jsx";
import { CustomerTr } from "./customerTr.jsx";

export const CustomerOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerData());
  }, [dispatch]);

  const user = useSelector((state) => state.oderReducer.currentUser);
  const ordersList = useSelector((state) => state.customerReducer.ordersList);
  const customerData = useSelector(
    (state) => state.customerReducer.customerData
  );

  const [currentDiv, setCurrentDiv] = useState("Tab1");
  const [content, setContent] = useState("BossContent");
  const [filtredOrderList, setFiltredOrderList] = useState(ordersList);

  useEffect(() => {
    if (currentDiv == "Tab1") {
      if (user.role == "customerBoss" || user.role == "admin") {
        setContent("BossContent");
      } else {
        setContent("TopSecret");
      }
    }
  }, [user, currentDiv]);
  useEffect(() => {
    setFiltredOrderList(ordersList);
  }, [ordersList]);

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

  const getFilterData = (data) => {
    let arrOrders = [];
    const findKey = (key) => {
      if (key == "date") return "date";
      if (key == "idManager") return "managerList";
      if (key == "idTrackDriver") return "driverList";
      if (key == "idLoadingPoint") return "loadingList";
      if (key == "idUnloadingPoint") return "unLoadingList";
      if (key == "customerPrice") return "priceList";
      if (key == "document") return "documentList";
      if (key == "customerPayment") return "paymentList";
      if (key == "customerClientId") return "customerClientList";
    };
    ordersList.forEach((elem) => {
      let condition = true;
      for (let key in elem) {
        if (key == "date") {
          let elemDate = new Date(elem[key]);
          let elemYear = elemDate.getFullYear();
          let elemMonth = elemDate.getMonth();
          let elemDay = elemDate.getDate();
          let dateText = `${elemYear}-${
            elemMonth < 9 ? `0${elemMonth + 1}` : `${elemMonth + 1}`
          }-${elemDay < 10 ? `0${elemDay}` : `${elemDay}`}`;
          let filter = data[findKey(key)].find(
            (date) => date.value == dateText
          );
          condition = condition && (filter ? filter.checked : false);
        }
        if (
          key == "idManager" ||
          key == "idTrackDriver" ||
          key == "customerClientId"
        ) {
          let filter = data[findKey(key)].find(
            (elemId) => elemId.id == elem[key]
          );
          condition = condition && (filter ? filter.checked : false);
        }
        if (key == "idLoadingPoint" || key == "idUnloadingPoint") {
          let check = false;
          elem[key].forEach((idPoint) => {
            let filter = data[findKey(key)].find(
              (filterPoint) => filterPoint.id == idPoint
            );
            check = check || (filter ? filter.checked : false);
          });
          condition = condition && check;
        }
        if (key == "customerPrice") {
          let filter = data[findKey(key)].find(
            (price) => price.value == elem[key]
          );
          condition = condition && (filter ? filter.checked : false);
        }
        if (key == "document" || key == "customerPayment") {
          let value = elem[key] == "Ок" ? "Ок" : "нет";
          let filter = data[findKey(key)].find(
            (filterElem) => filterElem.value == value
          );
          condition = condition && (filter ? filter.checked : false);
        }
      }
      if (condition) arrOrders.push(elem);
    });
    setFiltredOrderList(arrOrders);
  };

  return (
    <div className="customerOrderContainer">
      <header className="customerOrdersHeader">
        <span className="customerOrdersHeaderHeader">
          Список заказов автотранспорта
        </span>
        <span className="customerOrdersUser">{user.name}</span>
        <span className="customerOrdersExit" onClick={handleClickExit}>
          {"Выйти"}
        </span>
      </header>
      <main className="customerOrdersMain">
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
          <span className="customerOrderHeaderSpan">
            {customerData ? customerData.companyName : null}
          </span>
        </header>
        <div className="customerOrdderContentDiv">
          {content == "BossContent" && (
            <table className="customerOrderContentTable">
              <CustomerTheader
                data={ordersList}
                getFilterData={getFilterData}
              />
              <tbody>
                {filtredOrderList.map((elem) => {
                  return (
                    <CustomerTr key={`customerTable${elem._id}`} elem={elem} />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};
