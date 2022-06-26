import React, { useEffect, useState } from "react";

import "./editData.sass";

export const DriverAddTr = (props) => {
  const [editColNumber, setEditColNumber] = useState(0);
  const [addDriverObj, setAddDriverObj] = useState({});

  useEffect(() => {
    let div = document.querySelector(".EDFTableDiv");
    div.scrollTop = div.scrollHeight;
  }, []);
  useEffect(() => {
    if (editColNumber < 7) {
      let parent = document.querySelector(".driverAddTr");
      let input = parent.querySelector(".driverTrInput");
      input.focus();
    }
  }, [editColNumber]);

  const getKeyObj = (col) => {
    switch (col) {
      case 0:
        return "value";
      case 1:
        return "phone";
      case 2:
        return "companyName";
      case 3:
        return "TIN";
      case 4:
        return "address";
      case 5:
        return "currentAccount";
      case 6:
        return "contract";
      case 7:
        return "active";
      default:
        break;
    }
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (addDriverObj.value != "" && addDriverObj.value != undefined) {
        let { ...obj } = addDriverObj;
        obj[getKeyObj(editColNumber)] = e.currentTarget.value;
        props.handleAddDriver(obj);
      } else {
        setEditColNumber(0);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addDriverObj;
          obj.value = e.currentTarget.value;
          props.handleAddDriver(obj);
        }
      }
    }
    if (e.key == "Tab") {
      let { ...obj } = addDriverObj;
      console.log(e.currentTarget);
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
          obj.phone = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 2:
          obj.companyName = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 3:
          if (e.currentTarget.value != "") {
            obj.TIN = e.currentTarget.value;
          } else {
            obj.TIN = null;
          }
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 4:
          obj.address = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 5:
          obj.currentAccount = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 6:
          obj.contract = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 7:
          obj.active = e.currentTarget.value;
          if (obj.value != "") {
            props.handleAddDriver(obj);
          } else {
            setEditColNumber(0);
          }
        default:
          break;
      }
      setAddDriverObj(obj);
    }
  };

  return (
    <tr className="driverAddTr">
      <td className="driverTd">
        {editColNumber == 0 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.value
        )}
      </td>
      <td className="driverTd">
        {editColNumber == 1 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.phone
        )}
      </td>
      <td className="driverTd">
        {editColNumber == 2 ? (
          <input
            type="text"
            onKeyDown={handleEnter}
            className="driverTrInput"
          />
        ) : (
          addDriverObj.companyName
        )}
      </td>
      <td className="driverTd">
        {editColNumber == 3 ? (
          <input
            type="text"
            onKeyDown={handleEnter}
            className="driverTrInput"
          />
        ) : (
          addDriverObj.TIN
        )}
      </td>
      <td className="driverTd">
        {editColNumber == 4 ? (
          <input
            type="text"
            onKeyDown={handleEnter}
            className="driverTrInput"
          />
        ) : (
          addDriverObj.address
        )}
      </td>
      <td className="driverTd">
        {editColNumber == 5 ? (
          <input
            type="text"
            onKeyDown={handleEnter}
            className="driverTrInput"
          />
        ) : (
          addDriverObj.currentAccount
        )}
      </td>
      <td className="driverTd">
        {editColNumber == 6 ? (
          <input
            type="text"
            onKeyDown={handleEnter}
            className="driverTrInput"
          />
        ) : (
          addDriverObj.contract
        )}
      </td>
      <td className="driverTd">
        {editColNumber == 7 ? (
          <div>
            <span>
              <input
                type="radio"
                name="active"
                value={1}
                onChange={handleEnter}
                onKeyDown={handleEnter}
              />
              Да
            </span>
            <span>
              <input
                type="radio"
                name="active"
                value={0}
                onChange={handleEnter}
              />
              Нет
            </span>
          </div>
        ) : addDriverObj.active == 1 ? (
          "да"
        ) : (
          "нет"
        )}
      </td>
    </tr>
  );
};
