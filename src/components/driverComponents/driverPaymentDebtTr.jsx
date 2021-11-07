import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./driverForms.sass";
import { dateLocal } from "../myLib/myLib";

export const DriverPaymentDebtTr = (props) => {
  const [classNameTr, setClassNameTr] = useState("driverDebtMainTd");
  const driverList = useSelector((state) => state.oderReducer.driverlist);
  const elem = props.debtData;
  const [showAddInfo, setShowAddInfo] = useState(false);

  const getDriverById = (id) => {
    if (driverList.length)
      return driverList.find((driver) => driver._id == id).value;
  };
  const handleClickTr = (e) => {
    if (props.choiceEnabled) {
      if (e.target.tagName == "TD") {
        if (classNameTr == "driverDebtMainTd") {
          if (!props.isDebtsChosen) {
            setClassNameTr("driverDebtMainTd driverDebtMark");
            props.choiseDebts(
              elem.id,
              Number(elem.sumOfDebt - elem.paidPartOfDebt)
            );
          }else alert("Сумма долга выбранна")
        } else {
          setClassNameTr("driverDebtMainTd");
          props.choiseDebts(
            elem.id,
            Number(elem.sumOfDebt - elem.paidPartOfDebt)
          );
        }
      }
    } else alert('Введите в поле "заплатить из долга" сумму');
  };
  const handleMouseOver = () => {
    if (elem.debtClosed == "частично") setShowAddInfo(true);
  };
  const handleMouseLeave = () => {
    setShowAddInfo(false);
  };
  return (
    <React.Fragment>
      <tr className={classNameTr} onClick={handleClickTr}>
        <td className="driverDebtMainTr">{dateLocal(elem.date)}</td>
        <td className="driverDebtMainTr">{getDriverById(elem.idDriver)}</td>
        <td className="driverDebtMainTr">{elem.category}</td>
        <td
          className="driverDebtMainTr"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {showAddInfo && (
            <div className="driverDebtDivPopup">{`Сумма долга ${elem.sumOfDebt} из него погашено ${elem.paidPartOfDebt} `}</div>
          )}
          {elem.sumOfDebt - elem.paidPartOfDebt}
        </td>
        <td className="driverDebtMainTr">{elem.addInfo}</td>
        <td className="driverDebtMainTr">{elem.debtClosed}</td>
      </tr>
    </React.Fragment>
  );
};
