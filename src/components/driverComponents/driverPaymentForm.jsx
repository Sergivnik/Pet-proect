import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./driverForms.sass";

export const DriverPaymentForm = () => {
  const clientList = useSelector((state) => state.oderReducer.clientList);
  const odersList = useSelector((state) => state.oderReducer.originOdersList);
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const citieslist = useSelector((state) => state.oderReducer.citieslist);

  return (
    <div className="driverPaymentMainDiv">
        <header className="driverPaymentHeader">
            
        </header>
      <p>Форма оплаты </p>
    </div>
  );
};
