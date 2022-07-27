import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./reports.sass";

export const IncomeReport = () => {
  const incomereport = useSelector((state) => state.oderReducer.incomereport);
  const ordersList = useSelector((state) => state.oderReducer.odersList);

  const [sumAccount, setSumAccount] = useState(null);
  const [customerDebt, setCustomerDebt] = useState(null);
  const [driverDebt, setDriverDebt] = useState(null);

  useEffect(() => {
    let div = document.querySelector(".odersDivInfo");
    let text = div.childNodes[0].innerText;
    console.log(text);
    let result = text.match(/\d+(\.\d{1,2})?/g);
    setSumAccount(Number(result[0]));
  }, []);
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
  }, [ordersList]);
  // Р.сч.+ДолгКлиента-ДолгВодителям-ДолгНалогЯпрошлГод+ПлатежиНалогЯтекГод-НакоплНалогЯтекГод-ДолгРозовым
  return (
    <dib>
      <header className="incomeReportHeader">
        <span>Рас.сч. {sumAccount}</span>
        <span>Долг заказчиков {customerDebt}</span>
        <span>Долг перевозчикам {driverDebt}</span>
      </header>
    </dib>
  );
};
