import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editData, delData } from "../../actions/editDataAction.js";

import "./editData.sass";

export const CustomerTr = (props) => {
  const dispatch = useDispatch();

  let elem = props.elem;
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [styleTr, setStyleTr] = useState(null);
  const [styleTd, setStileTd] = useState("customerTd");
  const [value, setValue] = useState(null);

  const handleClickTr = () => {
    props.getCurrentId(elem._id);
    setStyleTr("customerActiveTr");
    setStileTd("customerTd tdZ10");
  };
  const handleDBLclick = (e) => {
    let column = e.currentTarget.cellIndex;
    setColNumber(column);
    switch (column) {
      case 0:
        setValue(elem.value);
        break;
      case 1:
        setValue(elem.companyName);
        break;
      case 2:
        setValue(elem.TIN);
        break;
      case 3:
        setValue(elem.address);
        break;
      case 4:
        setValue(elem.email);
        break;
      case 5:
        setValue(elem.phone);
        break;
      case 5:
        setValue(elem.contract);
        break;
      default:
        break;
    }
    props.getCurrentId(elem._id);
    e.currentTarget.width = e.currentTarget.offsetWidth - 2 + "px";
    e.currentTarget.height = e.currentTarget.offsetHeight - 2 + "px";
    setCurrentElement(e.currentTarget);
  };
  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      let { ...obj } = elem;
      switch (colNumber) {
        case 0:
          obj.value = e.currentTarget.value;
          break;
        case 1:
          obj.companyName = e.currentTarget.value;
          break;
        case 2:
          obj.TIN = e.currentTarget.value;
          break;
        case 3:
          obj.address = e.currentTarget.value;
          break;
        case 4:
          obj.email = e.currentTarget.value;
          break;
        case 5:
          obj.phone = e.currentTarget.value;
          break;
        case 6:
          obj.contract = e.currentTarget.value;
          break;
        default:
          break;
      }
      dispatch(editData(obj, "oders"));
      setColNumber(null);
    }
  };
  const handleRadio = (e) => {
    let { ...obj } = elem;
    obj.active = e.currentTarget.value;
    dispatch(editData(obj, "oders"));
    setColNumber(null);
  };
  const handleClickDelete = () => {
    let password = prompt("Подтвердите удаление", "Пароль");
    if (password == "Пароль") {
      dispatch(delData(elem._id, "oders"));
    }
  };

  useEffect(() => {
    if (props.currentId != elem._id) {
      setColNumber(null);
      setStyleTr(null);
      setStileTd("customerTd");
    }
  }, [props.currentId]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.focus();
  }, [currentElement]);

  return (
    <tr onClick={handleClickTr} className={styleTr}>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 0 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={value}
          />
        ) : (
          elem.value
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 1 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={value}
          />
        ) : (
          elem.companyName
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 2 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={value}
          />
        ) : (
          elem.TIN
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 3 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={value}
          />
        ) : (
          elem.address
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 4 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={value}
          />
        ) : (
          elem.email
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 5 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={value}
          />
        ) : (
          elem.phone
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 6 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={value}
          />
        ) : (
          elem.contract
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 7 ? (
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
        ) : elem.active == 1 ? (
          "да"
        ) : (
          "нет"
        )}
        {styleTr != null && (
          <div className="customerPaymentTrClose" onClick={handleClickDelete}>
            <svg width="20px" height="20px" viewBox="0 0 60 60">
              <g transform="translate(232.000000, 228.000000)">
                <polygon points="-207,-205 -204,-205 -204,-181 -207,-181    " />
                <polygon points="-201,-205 -198,-205 -198,-181 -201,-181    " />
                <polygon points="-195,-205 -192,-205 -192,-181 -195,-181    " />
                <polygon points="-219,-214 -180,-214 -180,-211 -219,-211    " />
                <path d="M-192.6-212.6h-2.8v-3c0-0.9-0.7-1.6-1.6-1.6h-6c-0.9,0-1.6,0.7-1.6,1.6v3h-2.8v-3     c0-2.4,2-4.4,4.4-4.4h6c2.4,0,4.4,2,4.4,4.4V-212.6" />
                <path d="M-191-172.1h-18c-2.4,0-4.5-2-4.7-4.4l-2.8-36l3-0.2l2.8,36c0.1,0.9,0.9,1.6,1.7,1.6h18     c0.9,0,1.7-0.8,1.7-1.6l2.8-36l3,0.2l-2.8,36C-186.5-174-188.6-172.1-191-172.1" />
              </g>
            </svg>
          </div>
        )}
      </td>
    </tr>
  );
};
