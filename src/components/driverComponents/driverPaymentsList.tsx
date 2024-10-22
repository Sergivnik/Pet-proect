import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataDriverPayments } from "../../actions/driverActions.js";
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
  const driverPaymentList: DriverPayment[] = useSelector(
    (state: any) => state.driverReducer.driverpayment
  );
  const status: string = useSelector(
    (state: any) => state.driverReducer.status
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataDriverPayments());
  }, []);
  useEffect(() => {
    setStatusRequest(status);
  }, [status]);

  const [statusRequest, setStatusRequest] = useState<string | null>(null);
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
          <tr>
            <td>Lorem ipsum</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
