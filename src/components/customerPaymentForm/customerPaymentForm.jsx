import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./customerPaymentForm.sass";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { UserTrNew } from "../userTrNew/userTrNew.jsx";
import { makePaymentCustomer } from "../../actions/oderActions.js";

export const CustomerPaymentForm = () => {
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.originOdersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);
  const customerWithoutPayment = useSelector(
    (state) => state.oderReducer.customerWithoutPayment
  );

  const [idChoisenCustomer, setIdCoisenCustomer] = useState(null);
  const [oders, setOders] = useState(null);
  const [chosenOders, setChosenOders] = useState([]);
  const [sumChosenOder, setSumChosenOder] = useState(0);
  const [sumCustomerPayment, setSumCustomerPayment] = useState(0);
  const [extraPayments, setExtraPayments] = useState(0);
  const [filteredClientList, setFilteredClientList] = useState(null);
  const [totalDebt, setTotalDebt] = useState(0);
  const [showDebt, setShowDebt] = useState(false);
  const [clear, setClear] = useState(false);
  const [valueChoisenCustomer, setValueChoisenCustomer] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    let [...arr] = odersList.filter(
      (item) =>
        item.idCustomer == idChoisenCustomer && item.customerPayment != "Ок"
    );
    let clone = [];
    let sum = 0;
    arr.forEach((element) => {
      clone.push(Object.assign({}, element));
      sum =
        sum +
        Number(element.customerPrice) -
        Number(element.partialPaymentAmount);
    });
    setTotalDebt(sum - extraPayments);
    setOders(clone);
  }, [idChoisenCustomer, odersList]);
  useEffect(() => {
    let [...arr] = customerWithoutPayment
      .filter((item) => item.idCustomer != null)
      .map((item) => clientList.find((elem) => elem._id == item.idCustomer));
    setFilteredClientList(arr);
    console.log(arr);
  }, [customerWithoutPayment]);

  const setValue = (data) => {
    setValueChoisenCustomer(data.value);
    setIdCoisenCustomer(data._id);
    setExtraPayments(Number(data.extraPayments));
    setChosenOders([]);
    setSumChosenOder(0);
    setShowDebt(true);
    setClear(true);
  };
  const handleTrNewClick = (id, sum, chosen, check, accountNumber) => {
    if (check) {
      let [...arr] = chosenOders;
      if (!chosen) {
        arr.push(id);
        setSumChosenOder(sumChosenOder + sum);
      } else {
        let index = arr.indexOf(id);
        arr.splice(index, 1);
        setSumChosenOder(sumChosenOder - sum);
      }
      setChosenOders(arr);
    } else {
      let makePartialPayment = confirm(
        `Ахтунг!!! Сделать счет № ${accountNumber} частично проведенным на сумму ${
          sumCustomerPayment - sumChosenOder + extraPayments
        }`
      );
      if (makePartialPayment) {
        let index = oders.findIndex((item) => item._id == id);
        let [...arr] = oders;
        arr[index].partialPaymentAmount = arr[index].customerPrice;
        arr[index].customerPrice =
          sumCustomerPayment - sumChosenOder + extraPayments;
        arr[index].customerPayment = "Выбран для част.оплаты";
        setOders(arr);
      }
    }
  };

  const handleChangeSumPayment = (e) => {
    setSumCustomerPayment(e.currentTarget.value);
    setClear(true);
  };

  const handleClickMakePayment = () => {
    let arr = [];
    console.log(chosenOders);
    chosenOders.forEach((elem) => {
      oders.forEach((item) => {
        if (item.customerPayment != "Частично оплачен" && item._id == elem) {
          arr.push({ id: elem, customerPrice: Number(item.customerPrice) });
        }
        if (item.customerPayment == "Частично оплачен" && item._id == elem) {
          arr.push({
            id: elem,
            customerPrice:
              Number(item.customerPrice) - Number(item.partialPaymentAmount),
          });
        }
      });
    });
    setExtraPayments(
      Number(sumCustomerPayment) + extraPayments - sumChosenOder
    );
    setSumCustomerPayment(0);
    setChosenOders([]);
    setClear(false);
    setSumChosenOder(0);
    dispatch(makePaymentCustomer(arr, sumCustomerPayment, extraPayments));
  };
  return (
    <div className="customerPaymentMainDiv">
      <header className="customerPaymentHeader">
        <div className="customerPaymentHeaderDiv">
          <p className="customerPaymentHeaderP">Заказчик</p>
          <div className="customeerPaymentWrapperChoiseDiv">
            <div className="divChoise">
              <ChoiseList
                name="oders"
                arrlist={filteredClientList}
                setValue={setValue}
              />
            </div>
          </div>
        </div>
        <div className="customerPaymentHeaderDiv">
          <p className="customerPaymentHeaderP">Сумма платежа</p>
          <input
            type="number"
            onChange={handleChangeSumPayment}
            value={sumCustomerPayment}
          />
        </div>
        <div className="customerPaymentHeaderDiv">
          <p className="customerPaymentHeaderP">
            Сумма нераспределенных платежей
          </p>
          <div className="customerPaymentHeaderUnkown">
            {sumCustomerPayment - sumChosenOder + extraPayments} руб
          </div>
        </div>
      </header>
      {showDebt && (
        <div>
          <p className="customerPaymentTotalDebtP">
            Всего задолженность по клиенту {valueChoisenCustomer} составляет{" "}
            {totalDebt} руб.
          </p>
        </div>
      )}
      <div className="customerPaymentOdersDiv">
        <table className="odersTable">
          {idChoisenCustomer && (
            <tbody className="odersTbody">
              {oders.map((elem) => {
                let driver, customer;
                let loadingPoint,
                  unloadingPoint = [];
                elem.idDriver
                  ? (driver = driversList.find(
                      (item) => item._id === elem.idDriver
                    ).value)
                  : (driver = "");
                elem.idCustomer
                  ? (customer = clientList.find(
                      (item) => item._id === elem.idCustomer
                    ).value)
                  : (customer = "");
                if (elem.idLoadingPoint) {
                  loadingPoint = elem.idLoadingPoint.map((itemLP) => {
                    return citieslist.find((item) => item._id == itemLP).value;
                  });
                } else {
                  loadingPoint = [""];
                }
                if (elem.idUnloadingPoint) {
                  unloadingPoint = elem.idUnloadingPoint.map((itemLP) => {
                    return citieslist.find((item) => item._id == itemLP).value;
                  });
                } else {
                  unloadingPoint = [""];
                }
                return (
                  <UserTrNew
                    key={elem._id}
                    elem={elem}
                    handleTrNewClick={handleTrNewClick}
                    driver={driver}
                    customer={customer}
                    loadingPoint={loadingPoint}
                    unloadingPoint={unloadingPoint}
                    clear={clear}
                    balance={sumCustomerPayment - sumChosenOder + extraPayments}
                  />
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      {sumChosenOder ? (
        <button className="customerPaymentBtn" onClick={handleClickMakePayment}>
          Провести
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
