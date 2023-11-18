import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editData, delData } from "../../actions/editDataAction.js";

import "./editData.sass";
import { FormAddDoc } from "../userTrNew/formAddDoc.jsx";
import { getPdf } from "../../actions/documentAction.js";

export const DriverTableTR = (props) => {
  const dispatch = useDispatch();
  let elem = props.elem;
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [styleTr, setStyleTr] = useState("driverNotActiveTr");
  const [valueInput, setValueInput] = useState(null);
  const [isContext, setIsContext] = useState(false);

  const handleDBLclick = (e) => {
    let column = e.currentTarget.cellIndex;
    setColNumber(column);
    switch (column) {
      case 0:
        setValueInput(elem.value);
        break;
      case 1:
        setValueInput(elem.phone);
        break;
      case 2:
        setValueInput(elem.companyName);
        break;
      case 3:
        setValueInput(elem.TIN);
        break;
      case 4:
        setValueInput(elem.address);
        break;
      case 5:
        setValueInput(elem.currentAccount);
        break;
      case 6:
        setValueInput(elem.contract);
        break;
      default:
        break;
    }
    props.getCurrentId(elem._id);
    e.currentTarget.width = e.currentTarget.offsetWidth - 2 + "px";
    e.currentTarget.height = e.currentTarget.offsetHeight - 2 + "px";
    setCurrentElement(e.currentTarget);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      let { ...obj } = elem;
      switch (colNumber) {
        case 0:
          obj.value = e.currentTarget.value;
          break;
        case 1:
          obj.phone = e.currentTarget.value;
          break;
        case 2:
          obj.companyName = e.currentTarget.value;
          break;
        case 3:
          obj.TIN = e.currentTarget.value;
          break;
        case 4:
          obj.address = e.currentTarget.value;
          break;
        case 5:
          obj.currentAccount = e.currentTarget.value;
          break;
        case 6:
          obj.contract = e.currentTarget.value;
          break;
        default:
          break;
      }
      console.log(obj);
      dispatch(editData(obj, "drivers"));
      setColNumber(null);
    }
  };
  const handleRadio = (e) => {
    console.log(e.currentTarget.value);
    let { ...obj } = elem;
    obj.active = e.currentTarget.value;
    dispatch(editData(obj, "drivers"));
    setColNumber(null);
  };
  const handleClickTr = (e) => {
    console.log(e);
    props.getCurrentId(elem._id);
    setStyleTr("driverActiveTr");
  };
  const handleClickDelete = () => {
    let password = prompt("Подтвердите удаление", "Пароль");
    if (password == "Пароль") {
      dispatch(delData(elem._id, "drivers"));
    }
  };
  const handleChange = (e) => {
    setValueInput(e.currentTarget.value);
  };
  const handleContext = (e) => {
    e.preventDefault();
    setIsContext(true);
    props.getCurrentId(elem._id);
    setStyleTr("driverActiveTr");
  };
  const handleClickCreateDoc = () => {
    props.openFormAddDoc(props.elem._id);
    setIsContext(false);
  };
  const handleClickAddDoc = () => {
    //props.openFormAddDoc();
    setIsContext(false);
  };
  const handleClickPrintDoc = () => {
    dispatch(getPdf(elem._id, "ownerDoc"));
    setIsContext(false);
  };
  const handleClickDeleteDoc = () => {
    //props.openFormAddDoc();
    setIsContext(false);
  };

  useEffect(() => {
    if (props.currentId != elem._id) {
      setColNumber(null);
      setStyleTr("driverNotActiveTr");
      setIsContext(false);
    }
  }, [props.currentId]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.focus();
  }, [currentElement]);
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        setColNumber(null);
        setIsContext(false);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, []);

  return (
    <tr
      key={"driver" + elem._id}
      onClick={handleClickTr}
      className={styleTr}
      onContextMenu={handleContext}
    >
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 0 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.value
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 1 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.phone
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 2 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.companyName
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 3 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.TIN
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 4 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.address
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 5 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.currentAccount
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 6 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.contract
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
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
        {isContext && (
          <div className="divContextMenu">
            <p className="pContextMenu" onClick={handleClickCreateDoc}>
              Создать документ
            </p>
            <p className="pContextMenu" onClick={handleClickAddDoc}>
              Добавить документ
            </p>
            <p className="pContextMenu" onClick={handleClickPrintDoc}>
              Печать документ
            </p>
            <p className="pContextMenu" onClick={handleClickDeleteDoc}>
              Удалить документ
            </p>
          </div>
        )}
      </td>
    </tr>
  );
};
