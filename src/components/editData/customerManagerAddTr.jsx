import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib.js";

import "./editData.sass";

export const CustomerManagerAddTr = (props) => {
  const clientListFull = useSelector((state) => state.oderReducer.clientList);

  const [editColNumber, setEditColNumber] = useState(0);
  const [addManagerObj, setManagerObj] = useState({});

  const getKeyObj = (col) => {
    switch (col) {
      case 0:
        return "value";
      case 1:
        return "name";
      case 2:
        return "phone";
      case 3:
        return "email";
      default:
        break;
    }
  };
  const handleEnterTab = (e) => {
    if (e.key == "Enter") {
      if (addManagerObj.value != "" && addManagerObj.value != undefined) {
        let obj = { ...addManagerObj };
        obj[getKeyObj(editColNumber)] = e.currentTarget.value;
        props.handleAddManager(obj);
      } else {
        setEditColNumber(0);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addManagerObj;
          obj.value = e.currentTarget.value;
          props.handleAddManager(obj);
        }
      }
    }
    if (e.key == "Tab") {
      let { ...obj } = addManagerObj;
      switch (editColNumber) {
        case 0:
          obj.value = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 1:
          obj.name = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 2:
          obj.phone = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 3:
          obj.email = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber);
          }
          break;
        default:
          break;
      }
      setManagerObj(obj);
    }
  };
  const handleClickTd = (e) => {
    setEditColNumber(e.currentTarget.cellIndex);
  };
  const handleLostFocus = (e) => {
    let obj = { ...addManagerObj };
    obj[getKeyObj(editColNumber)] = e.currentTarget.value;
    setManagerObj(obj);
  };

  useEffect(() => {
    let div = document.querySelector(".EDFTableDiv");
    div.scrollTop = div.scrollHeight;
    if (props.customerId != null) {
      let { ...obj } = addManagerObj;
      obj.odersId = props.customerId;
      setManagerObj(obj);
    }
  }, []);
  useEffect(() => {
    if (editColNumber < 4 && editColNumber != null) {
      let parent = document.querySelector(".managerAddTr");
      let input = parent.querySelector(".customerTrInput");
      input.focus();
    }
  }, [editColNumber]);

  return (
    <tr className="managerAddTr">
      <td className="customerManagerTd" onClick={handleClickTd}>
        {editColNumber == 0 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnterTab}
            onBlur={handleLostFocus}
          />
        ) : (
          addManagerObj.value
        )}
      </td>
      <td className="customerManagerTd" onClick={handleClickTd}>
        {editColNumber == 1 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnterTab}
            onBlur={handleLostFocus}
          />
        ) : (
          addManagerObj.name
        )}
      </td>
      <td className="customerManagerTd" onClick={handleClickTd}>
        {editColNumber == 2 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnterTab}
            onBlur={handleLostFocus}
          />
        ) : (
          addManagerObj.phone
        )}
      </td>
      <td className="customerManagerTd" onClick={handleClickTd}>
        {editColNumber == 3 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnterTab}
            onBlur={handleLostFocus}
          />
        ) : (
          addManagerObj.email
        )}
      </td>
      <td className="customerManagerTd">
        {findValueBy_Id(addManagerObj.odersId, clientListFull).value}
      </td>
    </tr>
  );
};
