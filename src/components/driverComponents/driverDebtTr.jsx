import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./driverForms.sass";

export const DriverDebtTr = (props) => {
  const [classNameTr, setClassNameTr] = useState("driverDebtMainTd");
  const driverList = useSelector((state) => state.oderReducer.driverlist);
  const elem = props.debtData;

  useEffect(() => {
    if (elem.id == props.deleteId) {
      setClassNameTr("driverDebtMainTd driverDebtMark");
    } else {
      setClassNameTr("driverDebtMainTd");
    }
  });
  const DateStr = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const getDriverById = (id) => {
    if (driverList.length)
      return driverList.find((driver) => driver._id == id).value;
  };
  const handleClickTr = () => {
    if (classNameTr == "driverDebtMainTd") {
      props.handleCliclTr(elem.id);
    } else {
      props.handleCliclTr(null);
    }
  };
  return (
    <React.Fragment>
      <tr className={classNameTr} onClick={handleClickTr}>
        <td className="driverDebtMainTr">{DateStr(elem.date)}</td>
        <td className="driverDebtMainTr">{getDriverById(elem.idDriver)}</td>
        <td className="driverDebtMainTr">{elem.category}</td>
        <td className="driverDebtMainTr">{elem.sumOfDebt}</td>
        <td className="driverDebtMainTr">{elem.addInfo}</td>
        <td className="driverDebtMainTr">{elem.debtClosed}</td>
      </tr>
    </React.Fragment>
  );
};
