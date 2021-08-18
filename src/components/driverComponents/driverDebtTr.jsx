import React, { useEffect, useState } from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { editDataDriverDebt } from "../../actions/driverActions.js";
import "./driverForms.sass";

export const DriverDebtTr = (props) => {
  const dispatch = useDispatch();
  const dateLocal = (date) => {
    date = new Date(date);
    return date.toLocaleDateString();
  };
  const DateStr = (date) => {
    date = new Date(date);
    let month = date.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  };
  const [classNameTr, setClassNameTr] = useState("driverDebtMainTd");
  const driverList = useSelector((state) => state.oderReducer.driverlist);
  const elem = props.debtData;

  const [dateOfPayment, setDateOfPayment] = useState(DateStr(elem.date));
  const [showEditDate, setShowEditDate] = useState(false);
  useEffect(() => {
    if (elem.id == props.deleteId) {
      setClassNameTr("driverDebtMainTd driverDebtMark");
    } else {
      setClassNameTr("driverDebtMainTd");
    }
  }, [props.deleteId]);

  const getDriverById = (id) => {
    if (driverList.length)
      return driverList.find((driver) => driver._id == id).value;
  };
  const handleClickTr = (e) => {
    if (e.target.tagName == "TD") {
      if (classNameTr == "driverDebtMainTd") {
        props.handleCliclTr(elem.id);
      } else {
        props.handleCliclTr(null);
      }
    }
  };
  const handleDblClick = (e) => {
    e.stopPropagation();
    if (e.currentTarget.cellIndex == 0) {
      setShowEditDate(true);
    }
  };
  const handleGetDate = (e) => {
    setDateOfPayment(e.target.value);
  };
  const handleLostFocus = () => {
    if (showEditDate) {
      dispatch(
        editDataDriverDebt({
          id: elem.id,
          editField: "date",
          newValue: dateOfPayment,
        })
      );
      setShowEditDate(false);
    }
  };
  return (
    <React.Fragment>
      <tr className={classNameTr} onClick={handleClickTr}>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {showEditDate ? (
            <input
              className="driveDebtCreateInput"
              type="date"
              value={dateOfPayment}
              onChange={handleGetDate}
              onBlur={handleLostFocus}
            />
          ) : (
            dateLocal(elem.date)
          )}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {getDriverById(elem.idDriver)}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {elem.category}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {elem.sumOfDebt}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {elem.addInfo}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {elem.debtClosed}
        </td>
      </tr>
    </React.Fragment>
  );
};
