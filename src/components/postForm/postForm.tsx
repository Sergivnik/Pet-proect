import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { Customer } from "../reports/cardReport.tsx";

import "./postForm.sass";

export type documentStatus = "Ок" | "Нет" | "Факс" | "Сдал";
export type customerPaymentStatus =
  | "Ок"
  | "Нет"
  | "Мыло"
  | "Печать"
  | "Почта"
  | "Обещал оплату"
  | "Отдал клиенту"
  | "Частично оплачен";
export type driverPaymentStatus = "Ок" | "Нет";

export interface CustomerShort {
  _id: number;
  value: string;
}

export interface Order {
  _id: number;
  date: Date;
  idDriver: number;
  idCustomer: number;
  idLoadingPoint: number[];
  idUnloadingPoint: number[];
  customerPrice: number;
  driverPrice: number;
  proxy: boolean;
  completed: boolean;
  document: documentStatus;
  dateOfSubmission: Date;
  customerPayment: customerPaymentStatus;
  dateOfPromise: Date;
  driverPayment: driverPaymentStatus;
  dateOfPayment: Date;
  accountNumber: number;
  partialPaymentAmount: number;
  idTrackDriver: number;
  idTrack: number;
  idManager: number;
  loadingInfo: string[];
  unloadingInfo: string[];
  applicationNumber: number;
  colorTR: string;
  wasItPrinted: boolean;
  postTracker: string;
}

export const PostForm = () => {
  let now: Date = new Date();
  let year: number = now.getFullYear();
  let dateString: string = `${year}-01-01`;
  const customerList: Customer[] = useSelector(
    (state: any) => state.oderReducer.clientList
  );
  const orderList: Order[] = useSelector(
    (state: any) => state.oderReducer.originOdersList
  );

  const [showChoiseList, setShowChoiseList] = useState<boolean>(true);
  const [showChoiseDate, setShowChoiseDate] = useState<boolean>(true);
  const [showOrderList, setShowOrderList] = useState<boolean>(false);
  const [checkBoxNoPay, setCheckBoxNoPay] = useState<boolean>(true);
  const [checkBoxPost, setCheckBoxPost] = useState<boolean>(true);
  const [dateBegin, setDateBegin] = useState<string>(dateString);
  const [custometShort, setCustomerShort] = useState<CustomerShort | null>(
    null
  );
  const [postOrderList, setPostOrderList] = useState<Order[]>(orderList);

  useEffect(() => {
    let date: Date = new Date(dateBegin);
    let arr: Order[] = orderList.filter(
      (order: Order) => order.customerPayment == "Почта" && order.date >= date
    );
    setPostOrderList(arr);
  }, []);
  useEffect(() => {
    let date: Date = new Date(dateBegin);
    let arr: Order[] = orderList.filter((order: Order) => {
      if (custometShort) {
        if (custometShort._id == order.idCustomer) {
          if (new Date(order.date) >= date) {
            if (checkBoxPost) {
              if (order.customerPayment == "Почта" && order.postTracker == null)
                return order;
            } else {
              if (checkBoxNoPay) {
                if (order.customerPayment != "Ок") return order;
              } else {
                if (order.customerPayment == "Ок") return order;
              }
            }
          }
        }
      }
    });
    setPostOrderList(arr);
    console.log(arr);
  }, [custometShort, checkBoxNoPay, checkBoxPost, dateBegin]);

  const setValue = (data: any) => {
    console.log(data);
    setShowChoiseList(false);
    setCustomerShort({ _id: data._id, value: data.value });
    setShowOrderList(true);
  };
  const handleChoiseDblClick = (e) => {
    e.preventDefault();
    setShowChoiseList(true);
  };
  const handleClickChekBox = () => {
    setCheckBoxNoPay(!checkBoxNoPay);
    setShowOrderList(true);
  };
  const handleDateDblClick = (e) => {
    e.preventDefault();
    setShowChoiseDate(true);
  };
  const handleDateLostFocus = () => {
    setShowChoiseDate(false);
    setShowOrderList(true);
  };
  const handleChangeDate = (e: any) => {
    setDateBegin(e.target.value);
  };
  const handleClickChekBoxPost = () => {
    setCheckBoxPost(!checkBoxPost);
    setShowOrderList(true);
  };

  return (
    <div className="postFormWrapper">
      <header className="postFormHeader">
        <div className="customerChoiseWrapper">
          <span className="customerChoiseLabel">Заказчик</span>
          <div
            className="choiseListWrapper"
            onDoubleClick={handleChoiseDblClick}
          >
            {showChoiseList ? (
              <ChoiseList
                name="client"
                arrlist={customerList}
                setValue={setValue}
              />
            ) : (
              <span>{custometShort.value}</span>
            )}
          </div>
        </div>
        <div className="customerCheckWrapper">
          <span className="customerCheckLabel">без оплаты</span>
          <div className="inputCheckWrapper">
            <input
              type="checkbox"
              onChange={handleClickChekBox}
              checked={checkBoxNoPay}
            />
          </div>
        </div>
        <div className="customerDateWrapper">
          <span className="customerDateLebel">Дата с</span>
          <div className="choiseDateWrapper" onDoubleClick={handleDateDblClick}>
            {showChoiseDate ? (
              <input
                type="date"
                onChange={handleChangeDate}
                value={dateBegin}
                onBlur={handleDateLostFocus}
              />
            ) : (
              <span>{new Date(dateBegin).toLocaleDateString()}</span>
            )}
          </div>
        </div>
        <div className="postCheckWrapper">
          <span className="customerCheckLabel">без трека</span>
          <div className="inputCheckWrapper">
            <input
              type="checkbox"
              onChange={handleClickChekBoxPost}
              checked={checkBoxPost}
            />
          </div>
        </div>
      </header>
      <main className="postFormMain">
        {showOrderList && (
          <table>
            <thead>
              <tr>
                <td>Дата</td>
              </tr>
            </thead>
            <tbody>
              {postOrderList.map((order: Order) => {
                return (
                  <tr key={`order-${order._id}`}>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.customerPayment}</td>
                    <td>{order.accountNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};
