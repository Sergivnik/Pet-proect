import React, { useState } from "react";
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
  const handleTrNewClick = () => {
    setChosen(!chosen);
    props.handleTrNewClick(props.elem, chosen);
  };
  return (
    <tr
      id={props.elem._id}
      className={chosen ? "userTrChosen" : ""}
      onClick={handleTrNewClick}
    >
      <TdDate date={props.elem.date} />
      <TdDriver driver={props.driver} />
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
