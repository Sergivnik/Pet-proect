import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./customerPayments.sass";
import {
  getPaymentsData,
  deletePaymentData,
} from "../../middlewares/initialState";
import { CustomerPaymentsTr } from "./customerPaymentsTr.jsx";
import { FilterDateList } from "../filterDate/filterDateList.jsx";
import { FilterList } from "../filterList/filterList.jsx";

export const CustomerPayments = () => {
  const dispatch = useDispatch();
  const customerPaymentsList = useSelector(
    (state) => state.oderReducer.customerPaymentsList
  );
  const [originDateList, setOriginDateList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [clientsFromPayments, setClientsFromPayments] = useState([]);
  const [origiClientsFromPayments, setOrigiClientsFromPayments] = useState([]);
  const [sumOfPaymentsList, setSumOfPaymentsList] = useState([]);
  const [originSumOfPayment, setOrigiSumOfPaymentsList] = useState([]);
  const [filteredCustomerPaymentsList, setFilteredCustomerPaymentsList] =
    useState(customerPaymentsList);

  const clientList = useSelector((state) => state.oderReducer.clientList);
  const [showFilter, setShowFilter] = useState(false);
  const [colNumber, setColNumber] = useState(null);

  const [filterList, setFilterList] = useState({
    date: [],
    customer: [],
    sumOfPayment: [],
  });
  function compareNumeric(a, b) {
    if (Number(a) > Number(b)) return 1;
    if (Number(a) == Number(b)) return 0;
    if (Number(a) < Number(b)) return -1;
  }
  useEffect(() => {
    dispatch(getPaymentsData());
  }, [dispatch]);

  useEffect(() => {
    let arr = [];
    let arrCustomer = [];
    let arrSumOfPayment = [];
    customerPaymentsList.forEach((elem) => {
      if (!arr.includes(elem.date)) arr.push(elem.date);
      if (!arrCustomer.includes(elem.idCustomer))
        arrCustomer.push(elem.idCustomer);
      if (!arrSumOfPayment.includes(elem.sumOfPayment))
        arrSumOfPayment.push(elem.sumOfPayment);
    });
    let arrObj = [];
    arr.forEach((elem) => {
      arrObj.push({ date: elem });
    });
    setOriginDateList(arrObj);
    setDateList(arrObj);
    arrObj = [];
    arrCustomer.forEach((elem) => {
      let obj = clientList.find((item) => item._id == elem);
      arrObj.push(obj);
    });
    setOrigiClientsFromPayments(arrObj);
    setClientsFromPayments(arrObj);
    arrObj = [];
    let i = 1;
    arrSumOfPayment.sort(compareNumeric);
    arrSumOfPayment.forEach((elem) => {
      let obj = { _id: i, value: elem };
      i++;
      arrObj.push(obj);
    });
    setOrigiSumOfPaymentsList(arrObj);
    setSumOfPaymentsList(arrObj);
  }, [customerPaymentsList]);

  useEffect(() => {
    if (
      filterList.date.length == 0 &&
      filterList.customer.length == 0 &&
      filterList.sumOfPayment.length == 0
    ) {
      if (originDateList.length) setDateList(originDateList);
      if (origiClientsFromPayments.length)
        setClientsFromPayments(origiClientsFromPayments);
      if (originSumOfPayment.length) setSumOfPaymentsList(originSumOfPayment);
      setFilteredCustomerPaymentsList(customerPaymentsList);
    } else {
      let arrDate = [];
      let arrCustomer = [];
      let arrSum = [];
      let arr = customerPaymentsList.filter((elem) => {
        let checkDate = false;
        let checkCustomer = false;
        let checkSum = false;
        if (filterList.date.length != 0) {
          filterList.date.forEach((dateTxt) => {
            let dateFromList = new Date(elem.date.toLocaleString()).toDateString();
            let dateFromFilter = new Date(dateTxt).toDateString();
            //dateFromFilter.setHours(0,0,0,0)
            console.log(dateFromList, dateFromFilter);
            if (dateFromList == dateFromFilter) checkDate = true;
          });
        } else checkDate = true;
        if (filterList.customer.length != 0) {
          filterList.customer.forEach((customerId) => {
            if (elem.idCustomer == customerId) checkCustomer = true;
          });
        } else checkCustomer = true;
        if (filterList.sumOfPayment.length != 0) {
          filterList.sumOfPayment.forEach((sumId) => {
            let sum = originSumOfPayment.find((item) => item._id == sumId);
            if (sum.value == elem.sumOfPayment) checkSum = true;
          });
        } else checkSum = true;
        if (checkCustomer && checkSum && !arrDate.includes(elem.date))
          arrDate.push(elem.date);
        if (checkDate && checkSum && !arrCustomer.includes(elem.idCustomer))
          arrCustomer.push(elem.idCustomer);
        if (checkDate && checkCustomer && !arrSum.includes(elem.sumOfPayment))
          arrSum.push(elem.sumOfPayment);
        if (checkDate && checkCustomer && checkSum) return elem;
      });
      let arrObj = [];
      arrDate.forEach((elem) => {
        arrObj.push({ date: elem });
      });
      setDateList(arrObj);
      arrObj = [];
      arrCustomer.forEach((elem) => {
        let obj = clientList.find((item) => item._id == elem);
        arrObj.push(obj);
      });
      setClientsFromPayments(arrObj);
      arrObj = [];
      arrSum.sort(compareNumeric);
      arrSum.forEach((elem) => {
        let obj = originSumOfPayment.find((element) => element.value == elem);
        arrObj.push(obj);
      });
      setSumOfPaymentsList(arrObj);
      setFilteredCustomerPaymentsList(arr);
    }
  }, [filterList, customerPaymentsList]);

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
      case "Customer":
        arr.customer = chosenList;
        setFilterList(arr);
        break;
      case "SummOfPayment":
        arr.sumOfPayment = chosenList;
        setFilterList(arr);
        break;
      default:
        break;
    }
  };

  const handleClickDelete = (id) => {
    alert(id);
    dispatch(deletePaymentData(id));
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
                    fill={filterList.customer.length > 0 ? "blue" : "black"}
                  />
                </svg>
              </button>
              {showFilter && colNumber === 1 && (
                <FilterList
                  name="Customer"
                  arrlist={clientsFromPayments}
                  filterList={filterList.customer}
                  closeFilter={closeFilter}
                  writeFilterList={writeFilterList}
                />
              )}
            </td>
            <td className="customerPaymentHeaderTd">
              <span className="customerPaymentHeaderSpan">Сумма платежа</span>
              <button
                className="customerPaymentHeaderFilter"
                onClick={handleClickFilter}
              >
                <svg width="100%" height="20">
                  <polygon
                    points="5 5, 25 5, 15 15, 5 5 "
                    fill={filterList.sumOfPayment.length > 0 ? "blue" : "black"}
                  />
                </svg>
              </button>
              {showFilter && colNumber === 2 && (
                <FilterList
                  name="SummOfPayment"
                  arrlist={sumOfPaymentsList}
                  filterList={filterList.sumOfPayment}
                  closeFilter={closeFilter}
                  writeFilterList={writeFilterList}
                />
              )}
            </td>
            <td className="customerPaymentHeaderTd">
              Сумма распределенная по заказам
            </td>
            <td className="customerPaymentHeaderTd">Сумма переплаты</td>
          </tr>
        </thead>
        <tbody>
          {filteredCustomerPaymentsList.map((elem) => {
            return (
              <CustomerPaymentsTr
                key={elem.id}
                paymentData={elem}
                handleClickDelete={handleClickDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
