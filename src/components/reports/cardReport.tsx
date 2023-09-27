import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataDriverDebt } from "../../actions/driverActions.js";
import { dateLocal, findValueBy_Id } from "../myLib/myLib.js";
import { TdSum } from "./tdSum.tsx";

import "./reports.sass";
type Category = "Топливо" | "Проценты" | "Пинк" | "Аванс" | "Прочее";

type DebtClosed = "Ок" | "нет" | "частично";

interface Debt {
  id: number;
  date: string;
  idDriver: number;
  category: Category;
  sumOfDebt: number;
  debtClosed: DebtClosed;
  addInfo: string;
  paidPartOfDebt: number;
  card: boolean;
}

interface CustomerAddDebt {
  id: number;
  customerId: number;
  sum: number;
  safe: boolean;
  card: boolean;
  orderId: number;
  customerPayment: boolean;
  returnPayment: boolean;
  date: string;
  interest: number;
}

interface Driver {
  id: number;
  value: string;
  phone: string;
  companyName: string;
  TIN: string;
  address: string;
  currentAccount: string;
  contract: string;
  active: boolean;
  addInfo: string;
}

interface Customer {
  id: number;
  value: string;
  extraPayments: number;
  companyName: string;
  TIN: string;
  address: string;
  email: string;
  phone: string;
  contract: string;
  active: boolean;
  postAddress: string;
  addInfo: string;
  KPP: string;
  OGRN: string;
  Acc: string;
  CorAcc: string;
  RCBIC: string;
  bossName: string;
  bankName: string;
  bankAddress: string;
}
interface cardTransaction {
  driverDebtsId: number[];
  customerDebtsId: number[];
}
export const CardReport = () => {
  const dispatch: any = useDispatch();

  const driverDebtCard: Debt[] = useSelector(
    (state: any) => state.oderReducer.driverDebtList
  );
  const customerDebtCard: CustomerAddDebt[] = useSelector(
    (state: any) => state.oderReducer.addtable
  );
  const driverList: Driver[] = useSelector(
    (state: any) => state.oderReducer.driverlist
  );
  const customerList: Driver[] = useSelector(
    (state: any) => state.oderReducer.clientList
  );
  const orderList: any = useSelector(
    (state: any) => state.oderReducer.originOdersList
  );

  const [unReturnedDebt, setUnReturnedDebt] = useState<Debt[] | null>(null);
  const [unClosedCustomerDebt, setUnClosedCustomerDebt] = useState<
    CustomerAddDebt[] | null
  >(null);
  const [choiseSum, setChoisenSum] = useState<number>(0);
  const [isCtrl, setIsCtrl] = useState<boolean>(false);
  const [isCardChecked, setIsCardChecked] = useState<boolean>(true);
  const [cardTransaction, setCardTransaction] = useState<cardTransaction>({
    driverDebtsId: [],
    customerDebtsId: [],
  });

  useEffect(() => {
    dispatch(getDataDriverDebt());
  }, [dispatch]);

  useEffect(() => {
    let unReturnedDebt: Debt[] = driverDebtCard.filter(
      (debt: Debt) => debt.card == false || debt.debtClosed != "Ок"
    );
    let unClosedCustomerDebt: CustomerAddDebt[] = customerDebtCard.filter(
      (debt: CustomerAddDebt) =>
        debt.safe == false ||
        debt.card == false ||
        debt.customerPayment == false ||
        debt.returnPayment == false
    );
    setUnReturnedDebt(unReturnedDebt);
    setUnClosedCustomerDebt(unClosedCustomerDebt);
  }, [driverDebtCard, customerDebtCard]);

  const handleClickSumm = (sum: number) => {
    setChoisenSum(choiseSum + sum);
  };
  const handleClickDiv = (e: any) => {
    let nameElem = e.target.getAttribute("data-name");
    if (nameElem != "sumTd") {
      setChoisenSum(0);
      setIsCtrl(false);
    } else {
      if (e.ctrlKey) {
        setIsCtrl(true);
      }
    }
  };
  const handleClickCardChecked = () => {
    setIsCardChecked(!isCardChecked);
    if (isCardChecked) {
      let unReturnedDebt: Debt[] = driverDebtCard.filter(
        (debt: Debt) => debt.card == false
      );
      let unClosedCustomerDebt: CustomerAddDebt[] = customerDebtCard.filter(
        (debt: CustomerAddDebt) => debt.card == false
      );
      setUnReturnedDebt(unReturnedDebt);
      setUnClosedCustomerDebt(unClosedCustomerDebt);
    } else {
      let unReturnedDebt: Debt[] = driverDebtCard.filter(
        (debt: Debt) => debt.card == false || debt.debtClosed != "Ок"
      );
      let unClosedCustomerDebt: CustomerAddDebt[] = customerDebtCard.filter(
        (debt: CustomerAddDebt) =>
          debt.safe == false ||
          debt.card == false ||
          debt.customerPayment == false ||
          debt.returnPayment == false
      );
      setUnReturnedDebt(unReturnedDebt);
      setUnClosedCustomerDebt(unClosedCustomerDebt);
    }
  };
  const handleClickCardDebt = (typeOfDebt: string, id: number) => {
    if (typeOfDebt === "driver") {
      let arr: number[] = cardTransaction.driverDebtsId;
      if (arr.includes(id)) {
        let index: number = arr.findIndex((debtId: number) => debtId == id);
        arr.splice(index, 1);
      } else {
        arr.push(id);
      }
      setCardTransaction({
        driverDebtsId: arr,
        customerDebtsId: cardTransaction.customerDebtsId,
      });
    }
    if (typeOfDebt === "customer") {
      let arr: number[] = cardTransaction.customerDebtsId;
      if (arr.includes(id)) {
        let index: number = arr.findIndex((debtId: number) => debtId == id);
        arr.splice(index, 1);
      } else {
        arr.push(id);
      }
      setCardTransaction({
        driverDebtsId: cardTransaction.driverDebtsId,
        customerDebtsId: arr,
      });
    }
  };

  return (
    <div className="mainCardReportForm" onClick={handleClickDiv}>
      <header className="mainReportFormHeader">
        <label>
          На карту
          <input
            type="checkBox"
            checked={isCardChecked}
            onChange={handleClickCardChecked}
          />
        </label>
        <p className="cardReportSumP">{choiseSum}</p>
      </header>
      <div className="tableWrapper">
        <table className="cardReportTable">
          <thead className="cardReportThead">
            <tr>
              <td className="cardReportTd">Дата</td>
              <td className="cardReportTd">Водитель</td>
              <td className="cardReportTd">Категория</td>
              <td className="cardReportTd">Сумма</td>
              <td className="cardReportTd">Долг закрыт</td>
              <td className="cardReportTd">Примечание</td>
              <td className="cardReportTd">Остаток долга</td>
              <td className="cardReportTd">Карта</td>
            </tr>
          </thead>
          <tbody>
            {unReturnedDebt
              ? unReturnedDebt.map((debt: Debt) => {
                  return (
                    <tr
                      key={`driverDebt${debt.id}`}
                      onClick={() => handleClickCardDebt("driver", debt.id)}
                    >
                      <td className="cardReportTd">
                        {debt ? dateLocal(debt.date) : null}
                      </td>
                      <td className="cardReportTd">
                        {debt
                          ? findValueBy_Id(debt.idDriver, driverList).value
                          : null}
                      </td>
                      <td className="cardReportTd">
                        {debt ? debt.category : null}
                      </td>
                      <TdSum
                        sum={debt ? debt.sumOfDebt : null}
                        isCtrl={isCtrl}
                        handleClickSumm={handleClickSumm}
                      />
                      <td className="cardReportTd">
                        {debt ? debt.debtClosed : null}
                      </td>
                      <td className="cardReportTd">
                        {debt ? debt.addInfo : null}
                      </td>
                      <td className="cardReportTd">
                        {debt.paidPartOfDebt ? debt.paidPartOfDebt : "0.00"}
                      </td>
                      <td className="cardReportTd">
                        {debt ? (debt.card ? "Ок" : "нет") : null}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <table className="cardReportTable">
          <thead className="cardReportThead">
            <tr>
              <td className="cardReportTd">Клиент</td>
              <td className="cardReportTd">Сумма</td>
              <td className="cardReportTd">Сейф</td>
              <td className="cardReportTd">Карта</td>
              <td className="cardReportTd">Оплата заказа</td>
              <td className="cardReportTd">Оплата клиенту</td>
              <td className="cardReportTd">Дата оплаты</td>
            </tr>
          </thead>
          <tbody>
            {unClosedCustomerDebt
              ? unClosedCustomerDebt.map((debt: CustomerAddDebt) => {
                  let order: any = orderList.find(
                    (order: any) => order._id == debt.orderId
                  );
                  let sumOfdebt: number =
                    ((order.customerPrice - debt.sum) * (100 - debt.interest)) /
                    100;
                  console.log(sumOfdebt);
                  return (
                    <tr
                      key={`customerDebt${debt.id}`}
                      onClick={() => handleClickCardDebt("customer", debt.id)}
                    >
                      <td className="cardReportTd">
                        {debt
                          ? findValueBy_Id(debt.customerId, customerList).value
                          : null}
                      </td>
                      <TdSum
                        sum={sumOfdebt}
                        isCtrl={isCtrl}
                        handleClickSumm={handleClickSumm}
                      />
                      <td className="cardReportTd">
                        {debt ? (debt.safe ? "Ок" : "нет") : null}
                      </td>
                      <td className="cardReportTd">
                        {debt ? (debt.card ? "Ок" : "нет") : null}
                      </td>
                      <td className="cardReportTd">
                        {debt ? (debt.customerPayment ? "Ок" : "нет") : null}
                      </td>
                      <td className="cardReportTd">
                        {debt ? (debt.returnPayment ? "Ок" : "нет") : null}
                      </td>
                      <td className="cardReportTd">
                        {debt ? dateLocal(debt.date) : null}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
