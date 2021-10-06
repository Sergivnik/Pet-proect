import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./contractorForm.sass";
import { dateLocal } from "../myLib/myLib";

export const ContractorPaymentTr = (props) => {
  const constractorsList = useSelector(
    (state) => state.oderReducer.constractorsList
  );
  let elem = props.paymentData;

  const findValueById = (id)=>{
   let value = constractorsList.find((elem) => elem.id == id);
   if (value != undefined) {
     return value.value;
   } else {
     return "";
   }
  }
  return (
    <tr>
      <td className="contrPayBodyTr">{dateLocal(elem.date)}</td>
      <td className="contrPayBodyTr">{findValueById(elem.idContractor, constractorsList)}</td>
      <td className="contrPayBodyTr">{elem.sum}</td>
      <td className="contrPayBodyTr">{elem.category}</td>
      <td className="contrPayBodyTr">{elem.addInfo}</td>
    </tr>
  );
};
