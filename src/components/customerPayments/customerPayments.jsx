import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./customerPayments.sass";
import { getPaymentsData } from "../../middlewares/initialState";
import { CustomerPaymentsTr } from "./customerPaymentsTr.jsx";
import { FilterDateList } from "../filterDate/filterDateList.jsx";
import { FilterList } from "../filterList/filterList.jsx";

export const CustomerPayments = () => {
  const dispatch = useDispatch();
  const customerPaymentsList = useSelector(
    (state) => state.oderReducer.customerPaymentsList
  );
  const [clientsFromPayments, setClientsFromPayments] = useState([]);

  const clientList = useSelector((state) => state.oderReducer.clientList);
  const [showFilter, setShowFilter] = useState(false);
  const [colNumber, setColNumber] = useState(null);
  const [dateList, setDateList] = useState([]);
  const [filterList, setFilterList] = useState({ date: [], driver: [] });

  useEffect(() => {
    dispatch(getPaymentsData());
  }, [dispatch]);
  useEffect(() => {
    let arr = [];
    let arrCustomer = [];
    customerPaymentsList.forEach((elem) => {
      if (!arr.includes(elem.date)) arr.push(elem.date);
      if (!arrCustomer.includes(elem.idCustomer))
        arrCustomer.push(elem.idCustomer);
    });
    let arrObj = [];
    arr.forEach((elem) => {
      arrObj.push({ date: elem });
    });
    setDateList(arrObj);
    let arrCustomerObj = [];
    arrCustomer.forEach((elem) => {
      let obj = clientList.find((item) => item._id == elem);
      arrCustomerObj.push(obj);
    });
    setClientsFromPayments(arrCustomerObj);
  }, [customerPaymentsList]);

  const handleClickFilter = (e) => {
    setShowFilter(true);
    setColNumber(e.currentTarget.parentElement.cellIndex);
  };
  const closeFilter = () => setShowFilter(false);
  const writeFilterList = (chosenList, name) => {
    let { ...arr } = filterList;
    switch (name) {
      case "Date":
        chosenList = chosenList.map((elem) => {
          let arrdate = elem.split("-");
          return `${arrdate[0]}-${Number(arrdate[1]) + 1}-${arrdate[2]}`;
        });
        arr.date = chosenList;
        setFilterList(arr);
        break;
      default:
        break;
    }
  };
  return (
    <div className="customerPaymentsMainDiv">
      <table className="customerPaymentsMainTable">
        <thead className="customerPaymentMainMainHeader">
          <tr className="customerPaymentHeaderTr">
            <td className="customerPaymentHeaderTd">
              <span className="customerPaymentHeaderSpan">Дата</span>
              <button
                className="customerPaymentHeaderFilter"
                onClick={handleClickFilter}
              >
                <svg width="100%" height="20">
                  <polygon
                    points="5 5, 25 5, 15 15, 5 5 "
                    fill={filterList.date.length > 0 ? "blue" : "black"}
                  />
                </svg>
              </button>
              {showFilter && colNumber === 0 && (
                <FilterDateList
                  name="Date"
                  arrlist={dateList}
                  filterList={filterList.date}
                  closeFilter={closeFilter}
                  writeFilterList={writeFilterList}
                />
              )}
            </td>
            <td className="customerPaymentHeaderTd">
              <span className="customerPaymentHeaderSpan">Заказчик</span>
              <button
                className="customerPaymentHeaderFilter"
                onClick={handleClickFilter}
              >
                <svg width="100%" height="20">
                  <polygon
                    points="5 5, 25 5, 15 15, 5 5 "
                    fill={filterList.date.length > 0 ? "blue" : "black"}
                  />
                </svg>
              </button>
              {showFilter && colNumber === 1 && (
                <FilterList
                  name="Customer"
                  arrlist={clientsFromPayments}
                  filterList={filterList.driver}
                  closeFilter={closeFilter}
                  writeFilterList={writeFilterList}
                />
              )}
            </td>
            <td className="customerPaymentHeaderTd">Сумма платежа</td>
            <td className="customerPaymentHeaderTd">
              Сумма распределенная по заказам
            </td>
            <td className="customerPaymentHeaderTd">Сумма переплаты</td>
          </tr>
        </thead>
        <tbody>
          {customerPaymentsList.map((elem) => {
            return <CustomerPaymentsTr key={elem.id} paymentData={elem} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
