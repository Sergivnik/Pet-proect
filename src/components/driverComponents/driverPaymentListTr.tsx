import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DriverDebt,
  DriverDebtInfo,
  DriverPayment,
  Point,
  TrackDriver,
} from "./driverPaymentsList";
import { Driver } from "../editData/driverAccountTr";
import { findValueBy_Id, findValueById } from "../myLib/myLib.js";
import "./driverForms.sass";
import { Order } from "../postForm/postForm.js";

export const DriverPaymentListTr = (props: any) => {
  const [showOrderList, setShowOrderList] = useState<boolean>(false);
  const [showDebtList, setShowDebtList] = useState<boolean>(false);
  const [classNameTr, setClassNameTr] = useState<string>("");
  let payment: DriverPayment = props.payment;
  let orderList: number[] = payment.listOfOders;
  let debtList: DriverDebtInfo[] = payment.listOfDebts;

  const driverList: Driver[] = useSelector(
    (state: any) => state.oderReducer.driverlist
  );
  const orderFullList: Order[] = useSelector(
    (state: any) => state.oderReducer.originOdersList
  );
  const trackDriverList: TrackDriver[] = useSelector(
    (state: any) => state.oderReducer.trackdrivers
  );
  const pointList: Point[] = useSelector(
    (state: any) => state.oderReducer.citieslist
  );
  const driverDebtList: DriverDebt[] = useSelector(
    (state: any) => state.oderReducer.driverDebtList
  );

  const handleClickTr = (payment: DriverPayment) => {
    console.log(payment);
    if (classNameTr == "") {
      setClassNameTr("blueTr");
    } else {
      setClassNameTr("");
    }
    if (payment.listOfOders.length > 0) setShowOrderList(!showOrderList);
    if (payment.listOfDebts.length > 0) setShowDebtList(!showDebtList);
  };
  return (
    <React.Fragment>
      <tr onClick={() => handleClickTr(payment)} className={classNameTr}>
        <td className="driverPaymentTd">
          {new Date(payment.date).toLocaleDateString()}
        </td>
        <td className="driverPaymentTd">
          {findValueBy_Id(payment.idDriver, driverList).value}
        </td>
        <td className="driverPaymentTd">{payment.sumOfPayment}</td>
        <td className="driverPaymentTd">{payment.sumOfDebts}</td>
      </tr>
      {showOrderList && (
        <tr>
          <td colSpan={4}>
            <table className="driverOrdersLitTable">
              <thead className="driverPaymentsListMainTableThead">
                <tr>
                  <td>Дата</td>
                  <td>Водитель</td>
                  <td>Погрузка</td>
                  <td>Выгрузка</td>
                  <td>Цена</td>
                  <td>Номер счета</td>
                </tr>
              </thead>
              <tbody>
                {orderList.map((orderId: number) => {
                  let order: Order = findValueBy_Id(orderId, orderFullList);
                  let trackdriver: TrackDriver = findValueBy_Id(
                    order.idTrackDriver,
                    trackDriverList
                  );
                  let pointLoadList: string[] = order.idLoadingPoint.map(
                    (idPoint: number) => {
                      return findValueBy_Id(idPoint, pointList).value;
                    }
                  );
                  let pointUnloadList: string[] = order.idUnloadingPoint.map(
                    (idPoint: number) => {
                      return findValueBy_Id(idPoint, pointList).value;
                    }
                  );
                  return (
                    <tr key={`payment${payment.id}-order${orderId}`}>
                      <td className="driverPaymentTd">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="driverPaymentTd">{trackdriver.value}</td>
                      <td className="driverPaymentTd">
                        {pointLoadList.join(" - ")}
                      </td>
                      <td className="driverPaymentTd">
                        {pointUnloadList.join(" - ")}
                      </td>
                      <td className="driverPaymentTd">{order.driverPrice}</td>
                      <td className="driverPaymentTd">{order.accountNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
      {showDebtList && (
        <tr>
          <td colSpan={4}>
            <table className="driverDebtsListTable">
              <thead className="driverPaymentsListMainTableThead">
                <tr>
                  <td>Дата</td>
                  <td>Категория</td>
                  <td>Суммк</td>
                  <td>Оплачено</td>
                  <td>Примечание</td>
                </tr>
              </thead>
              <tbody>
                {debtList.map((debtInfo) => {
                  let debt: DriverDebt = findValueById(
                    debtInfo.id,
                    driverDebtList
                  );
                  return (
                    <tr key={`payment${payment.id}-debt${debt.id}`}>
                      <td className="driverPaymentTd">
                        {new Date(debt.date).toLocaleDateString()}
                      </td>
                      <td className="driverPaymentTd">{debt.category}</td>
                      <td className="driverPaymentTd">{debt.sumOfDebt}</td>
                      <td className="driverPaymentTd">{debtInfo.sum}</td>
                      <td className="driverPaymentTd">{debt.addInfo}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
