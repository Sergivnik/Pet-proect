import React, { useState } from "react";
import "./userTd.sass";

export const TdCustomerPrice = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleMouseOver = (e) => {
    setShowTooltip(true);
  };
  const handleMouseLeave = (e) => {
    setShowTooltip(false);
  };
  return (
    <td
      className="userTd"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {props.elem.customerPayment != "Частично оплачен"
        ? Number(props.elem.customerPrice)
        : Math.floor(
            (props.elem.customerPrice - props.elem.partialPaymentAmount) * 100
          ) / 100}
      {showTooltip && props.elem.customerPayment == "Частично оплачен" && (
        <div className="userTdTooltip">
          <p className="userTdP">
            Счет на сумму {props.elem.customerPrice} руб{" "}
          </p>
          <p className="userTdP">
            оплачено {props.elem.partialPaymentAmount} руб
          </p>
          <p className="userTdP">
            долг{" "}
            {Math.floor(
              (props.elem.customerPrice - props.elem.partialPaymentAmount) * 100
            ) / 100}
             руб
          </p>
        </div>
      )}
      {showTooltip && props.elem.customerPayment == "Выбран для част.оплаты" && (
        <div className="userTdTooltip">
          <p className="userTdP">
            Счет на сумму {props.elem.partialPaymentAmount} руб{" "}
          </p>
          <p className="userTdP">
            выбрано для оплаты {props.elem.customerPrice} руб
          </p>
          <p className="userTdP">
            останется неоплаченными {" "}
            {Math.floor(
              (props.elem.partialPaymentAmount - props.elem.customerPrice) * 100
            ) / 100}
             руб
          </p>
        </div>
      )}
    </td>
  );
};
