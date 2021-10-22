import React, { useEffect, useState } from "react";
import { TdDate } from "../userTd/tdDate.jsx";
import { TdDriver } from "../userTd/tdDriver.jsx";
import { TdCustomer } from "../userTd/tdCustomer.jsx";
import { TdLoadingPoint } from "../userTd/tdLoadingPoint.jsx";
import { TdUnoadingPoint } from "../userTd/tdUnloadingPoint.jsx";
import { TdCustomerPrice } from "../userTd/tdCustomerPrice.jsx";
import { TdDocument } from "../userTd/tdDocument.jsx";
import { TdCustomerPayment } from "../userTd/tdCustomerPayment.jsx";
import { TdAccountNumber } from "../userTd/tdAccountNumber.jsx";
import "./userTrNew.sass";

export const UserTrNew = (props) => {
  const [chosen, setChosen] = useState(false);
  let classes = "";
  if (chosen) {
    classes = "userTrChosen";
  } else {
    classes =
      props.elem.customerPayment == "Частично оплачен" ? "userTrPart" : "";
  }
  useEffect(() => {
    if (!props.clear) setChosen(false);
  }, [props.clear]);
  useEffect(() => {
    if (props.elem.customerPayment == "Выбран для част.оплаты")
      handleTrNewClick();
  }, [props.elem.customerPayment]);

  const handleTrNewClick = () => {
    let sum;
    let newBalance = 0;
    if (props.elem.customerPayment == "Частично оплачен") {
      sum = Number(props.elem.customerPrice - props.elem.partialPaymentAmount);
    } else {
      sum = Number(props.elem.customerPrice);
    }
    if (!chosen) {
      newBalance = props.balance - sum;
    } else {
      newBalance = props.balance + sum;
    }
    if (newBalance >= 0) {
      setChosen(!chosen);
      props.handleTrNewClick(
        props.elem._id,
        sum,
        chosen,
        true,
        props.elem.accountNumber
      );
    } else
      props.handleTrNewClick(
        props.elem._id,
        sum,
        chosen,
        false,
        props.elem.accountNumber
      );
  };
  return (
    <tr id={props.elem._id} className={classes} onClick={handleTrNewClick}>
      <TdDate date={props.elem.date} />
      <TdDriver driver={props.driver} elem={props.elem} />
      <TdCustomer customer={props.customer} />
      <TdLoadingPoint loadingPoint={props.loadingPoint} />
      <TdUnoadingPoint unloadingPoint={props.unloadingPoint} />
      <TdCustomerPrice elem={props.elem} />
      <TdDocument
        id={props.elem._id}
        customerPrice={props.elem.document}
        date={props.elem.dateOfSubmission}
      />
      <TdCustomerPayment customerPayment={props.elem.customerPayment} />
      <TdAccountNumber accountNumber={props.elem.accountNumber} />
    </tr>
  );
};
