import React from "react";

export const TdCustomerPrice = (props) => {
   console.log(Number(props.elem.customerPrice - props.elem.partialPaymentAmount));
   return <td className="odersTd">{props.elem.customerPayment != "Частично оплачен" ? Number(props.elem.customerPrice) : Math.floor((props.elem.customerPrice - props.elem.partialPaymentAmount) * 100) / 100}</td>;
}