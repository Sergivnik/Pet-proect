import React, { useEffect, useState } from "react";

import "./editData.sass";

export const CustomerAddTr = (props) => {
  const [editColNumber, setEditColNumber] = useState(0);
  const [addCustomerObj, setAddCustomerObj] = useState({
    value: "",
    companyName: "",
    TIN: "",
    address: "",
    postAddress: "",
    email: "",
    phone: "",
    contract: "",
    active: 1,
  });

  const getKeyObj = (col) => {
    switch (col) {
      case 0:
        return "value";
      case 1:
        return "companyName";
      case 2:
        return "TIN";
      case 3:
        return "address";
      case 4:
        return "postAddress";
      case 5:
        return "email";
      case 6:
        return "phone";
      case 7:
        return "contract";
      default:
        break;
    }
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (addCustomerObj.value != "" && addCustomerObj.value != undefined) {
        let obj = { ...addCustomerObj };
        obj[getKeyObj(editColNumber)] = e.currentTarget.value;
        props.handleAddCustomer(obj);
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
          let str = e.currentTarget.value.split("");
          let newPhone = "";
          str.forEach((elem) => {
            if (elem != " " && elem != "-" && elem != "(" && elem != ")")
              newPhone = newPhone + elem;
          });
          obj.phone = newPhone;
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
  const handleChange = (e) => {
    let obj = { ...addCustomerObj };
    obj[getKeyObj(editColNumber)] = e.currentTarget.value;
    setAddCustomerObj(obj);
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
            value={addCustomerObj.value}
            onChange={handleChange}
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
            value={addCustomerObj.companyName}
            onChange={handleChange}
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
            value={addCustomerObj.TIN}
            onChange={handleChange}
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
            value={addCustomerObj.address}
            onChange={handleChange}
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
            value={addCustomerObj.postAddress}
            onChange={handleChange}
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
            value={addCustomerObj.email}
            onChange={handleChange}
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
            value={addCustomerObj.phone}
            onChange={handleChange}
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
            value={addCustomerObj.contract}
            onChange={handleChange}
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
