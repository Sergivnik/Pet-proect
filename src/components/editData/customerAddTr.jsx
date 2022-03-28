import React, { useEffect, useState } from "react";

import "./editData.sass";

export const CustomerAddTr = (props) => {
  const [editColNumber, setEditColNumber] = useState(0);
  const [addCustomerObj, setAddCustomerObj] = useState({ active: 1 });

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (addCustomerObj.value != "" && addCustomerObj.value != undefined) {
        props.handleAddCustomer(addCustomerObj);
      } else {
        setEditColNumber(0);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addCustomerObj;
          obj.value = e.currentTarget.value;
          props.handleAddCustomer(obj);
        }
      }
    }
    if (e.key == "Tab") {
      let { ...obj } = addCustomerObj;
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
          obj.companyName = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 2:
          obj.TIN = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 3:
          obj.address = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 4:
          obj.postAddress = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 5:
          obj.email = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 6:
          obj.phone = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 7:
          obj.contract = e.currentTarget.value;
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        default:
          break;
      }
      setAddCustomerObj(obj);
    }
  };
  const handleRadio = (e) => {
    let { ...obj } = addCustomerObj;
    obj.active = e.currentTarget.value;
    props.handleAddCustomer(obj);
    setEditColNumber(null);
  };

  useEffect(() => {
    let div = document.querySelector(".EDFTableDiv");
    div.scrollTop = div.scrollHeight;
  }, []);
  useEffect(() => {
    if (editColNumber < 7 && editColNumber != null) {
      let parent = document.querySelector(".customerAddTr");
      let input = parent.querySelector(".customerTrInput");
      input.focus();
    }
  }, [editColNumber]);

  return (
    <tr className="customerAddTr">
      <td className="customerTd">
        {editColNumber == 0 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.value
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 1 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.companyName
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 2 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.TIN
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 3 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.address
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 4 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.postAddress
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 5 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.email
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 6 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.phone
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 7 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addCustomerObj.contract
        )}
      </td>
      <td className="customerTd">
        {editColNumber == 8 ? (
          <div>
            <span>
              <input
                type="radio"
                name="active"
                value={1}
                onChange={handleRadio}
              />
              Да
            </span>
            <span>
              <input
                type="radio"
                name="active"
                value={0}
                onChange={handleRadio}
              />
              Нет
            </span>
          </div>
        ) : addCustomerObj.active == 1 ? (
          "да"
        ) : (
          "нет"
        )}
      </td>
    </tr>
  );
};
