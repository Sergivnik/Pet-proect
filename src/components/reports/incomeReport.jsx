import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./reports.sass";

export const IncomeReport = () => {
  const incomereport = useSelector((state) => state.oderReducer.incomereport);
  const ordersList = useSelector((state) => state.oderReducer.odersList);
  const yearconst = useSelector((state) => state.oderReducer.yearconst);
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const income = useSelector((state) => state.oderReducer.income);
  const expenses = useSelector((state) => state.oderReducer.expenses);
  const customerPayments = useSelector(
    (state) => state.oderReducer.customerPaymentsList
  );
  const contractorsPayments = useSelector(
    (state) => state.oderReducer.contractorsPayments
  );
  const driverpayments = useSelector(
    (state) => state.oderReducer.driverpayments
  );
  const addtable = useSelector((state) => state.oderReducer.addtable);

  const [sumAccount, setSumAccount] = useState(null);
  const [customerDebt, setCustomerDebt] = useState(null);
  const [driverDebt, setDriverDebt] = useState(null);
  const [currentTax, setCurrentTax] = useState(null);
  const [sumPink, setSumPink] = useState(null);

  useEffect(() => {
    let addSum = clientList.reduce(
      (s, item) => s + Number(item.extraPayments),
      0
    );
    let sum =
      Math.floor((Number(income) - Number(expenses) + addSum + 0.0) * 100) /
      100;
    setSumAccount(sum);
  }, [income, expenses]);
  useEffect(() => {
    let customerDebt = 0;
    let driverDebt = 0;
    ordersList.forEach((elem) => {
      if (elem.customerPayment != "Ок") {
        if (elem.customerPayment == "Частично оплачен") {
          customerDebt =
            customerDebt +
            Number(elem.customerPrice) -
            Number(elem.partialPaymentAmount);
        } else {
          customerDebt = customerDebt + Number(elem.customerPrice);
        }
      }
      if (elem.driverPayment != "Ок") {
        driverDebt = driverDebt + Number(elem.driverPrice);
      }
    });
    setCustomerDebt(customerDebt);
    setDriverDebt(driverDebt);
    console.log(yearconst);
  }, [ordersList]);
  useEffect(() => {
    let dateBegin = new Date(new Date().getFullYear(), 0, 1);
    let dateEnd = new Date();
    let sumIn = 0;
    let sumOut = 0;
    customerPayments.forEach((elem) => {
      let date = new Date(elem.date);
      if (date >= dateBegin && date <= dateEnd) {
        sumIn = sumIn + Number(elem.sumOfPayment);
      }
    });
    contractorsPayments.forEach((elem) => {
      let date = new Date(elem.date);
      if (date >= dateBegin && date <= dateEnd && elem.category == 1) {
        if (Number(elem.sum) > 0) sumOut = sumOut + Number(elem.sum);
        if (Number(elem.sum) < 0) sumIn = sumIn - Number(elem.sum);
      }
    });
    driverpayments.forEach((elem) => {
      let date = new Date(elem.date);
      if (date >= dateBegin && date <= dateEnd) {
        sumOut = sumOut + Number(elem.sumOfPayment) - Number(elem.sumOfDebts);
      }
    });
    if ((sumIn - sumOut) / 10 > sumIn / 100) {
      setCurrentTax((sumIn - sumOut) / 10);
    } else {
      setCurrentTax(sumIn / 100);
    }
  }, [customerPayments, contractorsPayments, driverpayments]);
  useEffect(() => {
    let sumPink = 0;
    addtable.forEach((elem) => {
      if (elem.returnPayment == 0) {
        let price = Number(
          ordersList.find((order) => order._id == elem.orderId).customerPrice
        );
        sumPink =
          sumPink +
          ((price - Number(elem.sum)) * (100 - Number(elem.interest))) / 100;
      }
    });
    setSumPink(sumPink);
  }, [addtable]);

  // Р.сч.+ДолгКлиента-ДолгВодителям-ДолгНалогЯпрошлГод+ПлатежиНалогЯтекГод-НакоплНалогЯтекГод-ДолгРозовым

  return (
    <div>
      <header className="incomeReportHeader">
        <div>
          <span>Рас.сч.</span>
          <p> {sumAccount ? sumAccount.toLocaleString()+" руб" : null}</p>
        </div>
        <div>
          <span>Долг заказчиков</span>
          <p>{customerDebt ? customerDebt.toLocaleString()+" руб" : null}</p>
        </div>
        <div>
          <span>Долг перевозчикам</span>
          <p>{driverDebt ? driverDebt.toLocaleString()+" руб" : null}</p>
        </div>
        <div>
          <span>Долг по налогам прошлого года</span>
          <p>
            {yearconst
              ? Number(yearconst.lastyeartxdebt).toLocaleString()+" руб"
              : null}
          </p>
        </div>
        <div>
          <span>Аванм по налогам текущего года</span>
          <p>
            {yearconst ? Number(yearconst.taxadvance).toLocaleString()+" руб" : null}
          </p>
        </div>
        <div>
          <span>Налоги текущего года</span>
          <p>{currentTax ? currentTax.toLocaleString()+" руб" : null}</p>
        </div>
        <div>
          <span>Розовые</span>
          <p>{sumPink ? sumPink.toLocaleString()+" руб" : null}</p>
        </div>
      </header>
    </div>
  );
};
