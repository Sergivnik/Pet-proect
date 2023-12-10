import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { Customer } from "../reports/cardReport.tsx";

import "./postForm.sass";

export interface CustomerShort {
  _id: number;
  value: string;
}

export const PostForm = () => {
  let now: Date = new Date();
  let year: number = now.getFullYear();
  let dateString: string = `${year}-01-01`;
  const customerList: Customer[] = useSelector(
    (state: any) => state.oderReducer.clientList
  );

  const [showChoiseList, setShowChoiseList] = useState<boolean>(true);
  const [showChoiseDate, setShowChoiseDate] = useState<boolean>(true);
  const [checkBox, setCheckBox] = useState<boolean>(true);
  const [dateBegin, setDateBegin] = useState<string>(dateString);
  const [localDate, setLocalDate] = useState<Date>(null);

  const [custometShort, setCustomerShort] = useState<CustomerShort | null>(
    null
  );

  const setValue = (data: any) => {
    console.log(data);
    setShowChoiseList(false);
    setCustomerShort({ _id: data._id, value: data.value });
  };
  const handleChoiseDblClick = (e) => {
    e.preventDefault();
    setShowChoiseList(true);
  };
  const handleClickChekBox = () => {
    setCheckBox(!checkBox);
  };
  const handleDateDblClick = (e) => {
    e.preventDefault();
    setShowChoiseDate(true);
  };
  const handleDateLostFocus = () => {
    setShowChoiseDate(false);
  };
  const handleChangeDate = (e: any) => {
    let date = new Date(e.target.value);
    setDateBegin(e.target.value);
    setLocalDate(date);
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
              checked={checkBox}
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
              <span>{localDate.toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
