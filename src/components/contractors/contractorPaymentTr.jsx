import React from "react";
import { useSelector } from "react-redux";
import "./contractorForm.sass";
import { dateLocal } from "../myLib/myLib";

export const ContractorPaymentTr = (props) => {
  const contractorsList = useSelector(
    (state) => state.oderReducer.contractorsList
  );
  let elem = props.paymentData;
  let now= new Date();
  let date = new Date(elem.date);
  let contrPayBodyTr="";
  if (date > now) {
    contrPayBodyTr = "contrPayBodyTr";
  }

  const findValueById = (id)=>{
   let value = contractorsList.find((item) => item._id == id);
   if (value != undefined) {
     return value.value;
   } else {
     return "";
   }
  }
  return (
    <tr className={contrPayBodyTr}>
      <td className="contrPayBodyTd">{dateLocal(elem.date)}</td>
      <td className="contrPayBodyTd">{findValueById(elem.idContractor)}</td>
      <td className="contrPayBodyTd">{elem.sum}</td>
      <td className="contrPayBodyTd">{elem.category}</td>
      <td className="contrPayBodyTd">{elem.addInfo}</td>
    </tr>
  );
};
