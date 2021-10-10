import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./contractorForm.sass";
import { dateLocal } from "../myLib/myLib";

export const ContractorPaymentTr = (props) => {
  const contractorsList = useSelector(
    (state) => state.oderReducer.contractorsList
  );
  let elem = props.paymentData;

  const findValueById = (id)=>{
   let value = contractorsList.find((item) => item._id == id);
   if (value != undefined) {
     return value.value;
   } else {
     return "";
   }
  }
  return (
    <tr>
      <td className="contrPayBodyTr">{dateLocal(elem.date)}</td>
      <td className="contrPayBodyTr">{findValueById(elem.idContractor)}</td>
      <td className="contrPayBodyTr">{elem.sum}</td>
      <td className="contrPayBodyTr">{elem.category}</td>
      <td className="contrPayBodyTr">{elem.addInfo}</td>
    </tr>
  );
};
