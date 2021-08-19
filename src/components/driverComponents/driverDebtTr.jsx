import React, { useEffect, useState } from "react";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { editDataDriverDebt } from "../../actions/driverActions.js";
import "./driverForms.sass";

export const DriverDebtTr = (props) => {
  const dispatch = useDispatch();
  const categoryList = props.categoryList;
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
  const [showEditDriver, setShowEditDriver] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showEditSum, setShowEditSum] = useState(false);
  const [showEditAddInfo, setShowEditAddInfo] = useState(false);
  const [showEditDebtStatus, setShowEditDebtStatus] = useState(false);
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
    if (e.currentTarget.cellIndex == 1) {
      setShowEditDriver(true);
    }
    if (e.currentTarget.cellIndex == 2) {
      setShowEditCategory(true);
    }
    if (e.currentTarget.cellIndex == 3) {
      setShowEditSum(true);
    }
    if (e.currentTarget.cellIndex == 4) {
      setShowEditAddInfo(true);
    }
    if (e.currentTarget.cellIndex == 5) {
      setShowEditDebtStatus(true);
    }
  };
  const handleGetDate = (e) => {
    setDateOfPayment(e.target.value);
  };
  const setEditValue = (data) => {
    if (showEditDriver) {
      dispatch(
        editDataDriverDebt({
          id: elem.id,
          editField: "idDriver",
          newValue: data._id,
        })
      );
      setShowEditDriver(false);
    }
    if (showEditCategory) {
      dispatch(
        editDataDriverDebt({
          id: elem.id,
          editField: "category",
          newValue: data.value,
        })
      );
      setShowEditCategory(false);
    }
    if (showEditDebtStatus) {
      dispatch(
        editDataDriverDebt({
          id: elem.id,
          editField: "debtClosed",
          newValue: data.value,
        })
      );
      setShowEditDebtStatus(false);
    }
  };
  const handleLostFocus = (e) => {
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
    if (showEditSum) {
      dispatch(
        editDataDriverDebt({
          id: elem.id,
          editField: "sumOfDebt",
          newValue: e.target.value,
        })
      );
      setShowEditSum(false);
    }
    if (showEditAddInfo) {
      dispatch(
        editDataDriverDebt({
          id: elem.id,
          editField: "addInfo",
          newValue: e.target.value,
        })
      );
      setShowEditAddInfo(false);
    }
  };
  const handleKeyEnter = (e) => {
    if (e.key == "Enter") handleLostFocus(e);
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
          {showEditDriver ? (
            <div className="driverDebtCreateChoise">
              <ChoiseList
                name="driver"
                arrlist={driverList}
                setValue={setEditValue}
              />
            </div>
          ) : (
            getDriverById(elem.idDriver)
          )}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {showEditCategory ? (
            <div className="driverDebtCreateChoise">
              <ChoiseList
                name="category"
                arrlist={categoryList}
                setValue={setEditValue}
              />
            </div>
          ) : (
            elem.category
          )}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {showEditSum ? (
            <div className="driverDebtCreateChoise">
              <input
                className="driveDebtCreateInput"
                type="number"
                onBlur={handleLostFocus}
                onKeyDown={handleKeyEnter}
              />
            </div>
          ) : (
            elem.sumOfDebt
          )}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {showEditAddInfo ? (
            <div className="driverDebtCreateChoise">
              <input
                className="driveDebtCreateInput"
                type="text"
                onBlur={handleLostFocus}
                onKeyDown={handleKeyEnter}
              />
            </div>
          ) : (
            elem.addInfo
          )}
        </td>
        <td className="driverDebtMainTr" onDoubleClick={handleDblClick}>
          {showEditDebtStatus ? (
            <div className="driverDebtCreateChoise">
              <ChoiseList
                name="status"
                arrlist={[
                  { _id: 1, value: "Ок" },
                  { _id: 2, value: "нет" },
                ]}
                setValue={setEditValue}
              />
            </div>
          ) : (
            elem.debtClosed
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};
