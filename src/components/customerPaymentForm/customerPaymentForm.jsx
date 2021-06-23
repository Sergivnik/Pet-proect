import React from "react";
import { useSelector } from "react-redux";
import "./customerPaymentForm.sass";
import { ChoiseList } from "../choiseList/choiseList.jsx"

export const CustomerPaymentForm = () => {
   const clientList = useSelector((state) => state.oderReducer.clientList);
   const setValue = () => { }
   return (<div className="customerPaymentMainDiv">
      <header className="customerPaymentHeader">
         <div className="customerPaymentHeaderDiv">
            <p className="customerPaymentHeaderP">Заказчик</p>
            <ChoiseList name="oders" arrlist={clientList} setValue={setValue} />
         </div>
         <div className="customerPaymentHeaderDiv">
            <p className="customerPaymentHeaderP">Сумма платежа</p>
            <input type="number"/>
         </div>
         <div className="customerPaymentHeaderDiv">
            <p className="customerPaymentHeaderP">Сумма нераспределенных платежей</p>
            <div className="customerPaymentHeaderUnkown">{0} руб</div>
         </div>
      </header>
   </div>)
}