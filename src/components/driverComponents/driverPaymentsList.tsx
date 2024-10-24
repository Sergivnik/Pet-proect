import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataDriverPayments } from "../../actions/driverActions.js";
import { Driver } from "../editData/driverAccountTr.js";
import { DriverPaymentListTr } from "./driverPaymentListTr.tsx";
import "./driverForms.sass";

export interface DriverPayment {
  id: number;
  date: Date;
  idDriver: number;
  sumOfPayment: number;
  listOfOders: number[];
  sumOfDebts: number;
  listOfDebts: DriverDebtInfo[];
}
export interface DriverDebt {
  id: number;
  date: Date;
  idDriver: number;
  category: string;
  sumOfDebt: number;
  debtClosed: driverDebtStatus;
  addInfo: string;
  paidPartOfDebt: number;
  card: boolean;
}
export interface DriverDebtInfo {
  id: number;
  sum: number;
}
export type driverDebtStatus = "Ок" | "частично" | "нет";

export const DriverPaymentsList = () => {
  const [statusRequest, setStatusRequest] = useState<string | null>(null);
  const [paymentList, setPaymentList] = useState<DriverPayment[] | null>(null);

  const driverPaymentList: DriverPayment[] = useSelector(
    (state: any) => state.driverReducer.driverpayment
  );
  const status: string = useSelector(
    (state: any) => state.driverReducer.status
  );
  const driverList: Driver[] = useSelector(
    (state: any) => state.oderReducer.driverlist
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDriverPayments());
  }, []);
  useEffect(() => {
    setStatusRequest(status);
  }, [status]);
  useEffect(() => {
    setPaymentList(driverPaymentList);
  }, [driverPaymentList]);
  useEffect(() => {
    let div = document.getElementsByClassName("driverPaymentsListMainDiv")[0];
    div.scrollTop = div.scrollHeight;
  }, [paymentList]);

  return (
    <div className="driverPaymentsListMainDiv">
      {statusRequest != null && (
        <div className="statusRequestDiv">{statusRequest}</div>
      )}
      <table className="driverPaymentsLitMainTable">
        <thead className="driverPaymentsListMainTableThead">
          <tr>
            <td>Дата</td>
            <td>Перевозчик</td>
            <td>Сумма платежа</td>
            <td>Сумма списанная из долга</td>
          </tr>
        </thead>
        <tbody>
          {paymentList != null &&
            paymentList.map((payment: DriverPayment) => {
              return <DriverPaymentListTr payment={payment} />;
            })}
        </tbody>
      </table>
    </div>
  );
};
