import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./driverForms.sass";

export const DriverPaymentDebtTr = (props) => {
  const dateLocal = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const [classNameTr, setClassNameTr] = useState("driverDebtMainTd");
  const driverList = useSelector((state) => state.oderReducer.driverlist);
  const elem = props.debtData;

  const getDriverById = (id) => {
    if (driverList.length)
      return driverList.find((driver) => driver._id == id).value;
  };
  const handleClickTr = (e) => {
    if (e.target.tagName == "TD") {
      if (classNameTr == "driverDebtMainTd") {
        setClassNameTr("driverDebtMainTd driverDebtMark");
      } else {
        setClassNameTr("driverDebtMainTd");
      }
    }
    props.choiseDebts(elem.id, Number(elem.sumOfDebt));
  };

  return (
    <React.Fragment>
      <tr className={classNameTr} onClick={handleClickTr}>
        <td className="driverDebtMainTr">{dateLocal(elem.date)}</td>
        <td className="driverDebtMainTr">{getDriverById(elem.idDriver)}</td>
        <td className="driverDebtMainTr">{elem.category}</td>
        <td className="driverDebtMainTr">{elem.sumOfDebt}</td>
        <td className="driverDebtMainTr">{elem.addInfo}</td>
        <td className="driverDebtMainTr">{elem.debtClosed}</td>
      </tr>
    </React.Fragment>
  );
};
