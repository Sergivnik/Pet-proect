import React, { useEffect, useState } from "react";

export const CustomerPaymentsTr = (props) => {
  const DateStr = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const handleClickTr = () => {};
  let elem = props.paymentData;
  return (
    <tr onClick={handleClickTr}>
      <td>{DateStr(elem.date)}</td>
      <td>{props.nameOfCustomer}</td>
      <td>{elem.sumOfPayment}</td>
      <td>{props.sumOfOders}</td>
      <td>{elem.sumExtraPayment}</td>
    </tr>
  );
};
