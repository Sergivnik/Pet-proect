import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const CustomerManagerAddTr = (props) => {
  const clientListFull = useSelector((state) => state.oderReducer.clientList);

  const [editColNumber, setEditColNumber] = useState(0);
  const [addManagerObj, setManagerObj] = useState({});

  const handleInputBlur = (e) => {
    let { ...obj } = addManagerObj;
    switch (editColNumber) {
      case 0:
        obj.value = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 1:
        obj.name = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 2:
        obj.phone = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 3:
        obj.email = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      default:
        break;
    }
    setManagerObj(obj);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (addManagerObj.value != "" && addManagerObj.value != undefined) {
        props.handleAddManager(addManagerObj);
      } else {
        setEditColNumber(0);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addManagerObj;
          obj.value = e.currentTarget.value;
          props.handleAddManager(obj);
        }
      }
    }
  };
  const setValue = (data) => {
    let { ...obj } = addManagerObj;
    if (editColNumber == 4) {
      if (obj.value != "") {
        obj.odersId = data._id;
        setEditColNumber(null);
        props.handleAddManager(obj);
      } else {
        setEditColNumber(0);
      }
    }
  };

  useEffect(() => {
    let div = document.querySelector(".EDFTableDiv");
    div.scrollTop = div.scrollHeight;
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
      <td className="customerManagerTd">
        {editColNumber == 0 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addManagerObj.value
        )}
      </td>
      <td className="customerManagerTd">
        {editColNumber == 1 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addManagerObj.name
        )}
      </td>
      <td className="customerManagerTd">
        {editColNumber == 2 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addManagerObj.phone
        )}
      </td>
      <td className="customerManagerTd">
        {editColNumber == 3 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addManagerObj.email
        )}
      </td>
      <td className="customerManagerTd">
        {editColNumber == 4 ? (
          <ChoiseList
            name="owner"
            arrlist={clientListFull}
            setValue={setValue}
          />
        ) : (
          findValueBy_Id(addManagerObj.value, clientListFull)
        )}
      </td>
    </tr>
  );
};
