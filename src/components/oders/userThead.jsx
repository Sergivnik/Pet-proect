import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilterList } from "../filterList/filterList.jsx";
import { FilterDateList } from "../filterDate/filterDateList.jsx";
import { FilterPrice } from "../filterPrice/filterPrice.jsx";
import "./oders.sass";

export const UserThead = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [colNumber, setColNumber] = useState(null);
  const [sumCustomer, setSumCustomer] = useState(0);
  const [sumDriver, setSumDriver] = useState(0);

  const odersList = useSelector((state) => state.oderReducer.odersList);
  const dateList = useSelector((state) => state.oderReducer.filteredDateList);
  const driversList = useSelector((state) => state.oderReducer.filteredDrivers);
  const clientList = useSelector((state) => state.oderReducer.filteredClients);
  const citiesLoading = useSelector(
    (state) => state.oderReducer.filteredLoading
  );
  const citiesUnloading = useSelector(
    (state) => state.oderReducer.filteredUnloading
  );
  const filteredCustomerPrice = useSelector(
    (state) => state.oderReducer.filteredCustomerPrice
  );
  const filteredDriverPrice = useSelector(
    (state) => state.oderReducer.filteredDriverPrice
  );
  const statusCustomerPay = useSelector(
    (state) => state.oderReducer.filteredStatusCustomerPayment
  );
  const filteredAccountList = useSelector(
    (state) => state.oderReducer.filteredAccountList
  );

  useEffect(() => {
    let sumC = 0;
    let sumD = 0;
    odersList.forEach((element) => {
      sumC = sumC + Number(element.customerPrice);
      sumD = sumD + Number(element.driverPrice);
    });
    setSumCustomer(Math.floor(sumC * 100) / 100);
    setSumDriver(Math.floor(sumD * 100) / 100);
  }, [odersList]);

  const handleClickFilter = (e) => {
    setShowFilter(true);
    setColNumber(e.currentTarget.parentElement.cellIndex);
  };

  const closeFilter = () => setShowFilter(false);

  const getIdOnly = (arrObj) => {
    let arrId = [];
    arrObj.forEach((elem) => arrId.push(elem._id));
    return arrId;
  };

  return (
    <thead>
      <tr className="odersTr">
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Дата рейса</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={props.filterList.date.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 0 && (
            <FilterDateList
              name="Date"
              arrlist={dateList}
              filterList={props.filterList.date}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Водитель</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={props.filterList.driver.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 1 && (
            <FilterList
              name="Driver"
              arrlist={driversList}
              filterList={props.filterList.driver}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Заказчик</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={props.filterList.oder.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 2 && (
            <FilterList
              name="Customer"
              arrlist={clientList}
              filterList={props.filterList.oder}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Загрузка</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.cityLoading.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 3 && (
            <FilterList
              name="LoadingCity"
              arrlist={citiesLoading}
              filterList={props.filterList.cityLoading}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Выгрузка</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.cityUnloading.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 4 && (
            <FilterList
              name="UnloadingCity"
              arrlist={citiesUnloading}
              filterList={props.filterList.cityUnloading}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Цена клиента</span>
          <span className="odersTheadSpan">{sumCustomer} руб</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.customerPrice.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 5 && (
            <FilterPrice
              name="CustomerPrice"
              maxPrice={filteredCustomerPrice[1]}
              minPrice={filteredCustomerPrice[0]}
              filterList={props.filterList.customerPrice}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Цена водителя</span>
          <span className="odersTheadSpan">{sumDriver} руб</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5,5 25,5 15,15 5,5"
                fill={
                  props.filterList.driverPrice.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 6 && (
            <FilterPrice
              name="DriverPrice"
              maxPrice={filteredDriverPrice[1]}
              minPrice={filteredDriverPrice[0]}
              filterList={props.filterList.driverPrice}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Дов-ть</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={props.filterList.proxy.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 7 && (
            <FilterList
              name="Proxy"
              arrlist={[
                { _id: 1, value: "Ок" },
                { _id: 0, value: "Нет" },
              ]}
              filterList={props.filterList.proxy}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Выполнен</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={props.filterList.complited.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 8 && (
            <FilterList
              name="Complited"
              arrlist={[
                { _id: 1, value: "Ок" },
                { _id: 0, value: "Нет" },
              ]}
              filterList={props.filterList.complited}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Док-ты</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={props.filterList.documents.length > 0 ? "blue" : "black"}
              />
            </svg>
          </button>
          {showFilter && colNumber === 9 && (
            <FilterList
              name="Documents"
              arrlist={[
                { _id: 1, value: "Ок" },
                { _id: 2, value: "Нет" },
                { _id: 3, value: "Факс" },
              ]}
              filterList={props.filterList.documents}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Клиент Оплата</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={
                  props.filterList.customerPayment.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 10 && (
            <FilterList
              name="CustomerPayment"
              arrlist={statusCustomerPay}
              filterList={props.filterList.customerPayment}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Водитель Оплата</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={
                  props.filterList.driverPayment.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 11 && (
            <FilterList
              name="DriverPayment"
              arrlist={[
                { _id: 1, value: "Ок" },
                { _id: 2, value: "Нет" },
              ]}
              filterList={props.filterList.driverPayment}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader">
          <span className="odersTheadSpan">Номер счета</span>
          <button className="theadBtnFilter" onClick={handleClickFilter}>
            <svg width="100%" height="20">
              <polygon
                points="5 5, 25 5, 15 15, 5 5 "
                fill={
                  props.filterList.accountList.length > 0 ? "blue" : "black"
                }
              />
            </svg>
          </button>
          {showFilter && colNumber === 12 && (
            <FilterList
              name="AccountList"
              arrlist={filteredAccountList}
              filterList={getIdOnly(props.filterList.accountList)}
              closeFilter={closeFilter}
              writeFilterList={props.writeFilterList}
            />
          )}
        </td>
        <td className=" odersTRheader" style={{ border: "none" }}>
          <button className="odersTdBtn" onClick={props.handleClick}>
            Саздать
          </button>
        </td>
      </tr>
    </thead>
  );
};
