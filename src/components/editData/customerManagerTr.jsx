import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editData, delData } from "../../actions/editDataAction.js";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const CustomerManagerTr = (props) => {
  const dispatch = useDispatch();
  const clientListFull = useSelector((state) => state.oderReducer.clientList);

  let elem = props.elem;
  console.log(props);
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [styleTr, setStyleTr] = useState(null);
  const [styleTd, setStileTd] = useState("customerManagerTd");
  const [valueInput, setValueInput] = useState(null);

  const handleClickTr = (e) => {
    props.getCurrentId(elem._id);
    setStyleTr("customerActiveTr");
    setStileTd("customerManagerTd tdZ10");
  };
  const handleDBLclick = (e) => {
    let column = e.currentTarget.cellIndex;
    setColNumber(column);
    switch (column) {
      case 0:
        setValueInput(elem.value);
        break;
      case 1:
        setValueInput(elem.name);
        break;
      case 2:
        setValueInput(elem.phone);
        break;
      case 3:
        setValueInput(elem.email);
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
          obj.name = e.currentTarget.value;
          break;
        case 2:
          obj.phone = e.currentTarget.value;
          let str = e.currentTarget.value.split("");
          let newPhone = "";
          str.forEach((elem) => {
            if (elem != " " && elem != "-" && elem != "(" && elem != ")")
              newPhone = newPhone + elem;
          });
          obj.phone = newPhone;
          break;
        case 3:
          obj.email = e.currentTarget.value;
          break;
        default:
          break;
      }
      dispatch(editData(obj, "clientmanager"));
      setColNumber(null);
    }
  };
  const setValue = (data) => {
    let { ...obj } = elem;
    obj.odersId = data._id;
    dispatch(editData(obj, "clientmanager"));
    setColNumber(null);
  };
  const handleClickDelete = () => {
    let password = prompt("Подтвердите удаление", "Пароль");
    if (password == "Пароль") {
      dispatch(delData(elem._id, "clientmanager"));
    }
  };
  const handleChange = (e) => {
    setValueInput(e.currentTarget.value);
  };

  useEffect(() => {
    if (props.currentId != elem._id) {
      setColNumber(null);
      setStyleTr(null);
      setStileTd("customerManagerTd");
    }else{
      setStyleTr("customerActiveTr");
    }
  }, [props.currentId]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.focus();
  }, [currentElement]);
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        setColNumber(null);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, []);

  return (
    <tr onClick={handleClickTr} className={styleTr}>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 0 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
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
            value={valueInput}
          />
        ) : (
          elem.name
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 2 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.phone
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 3 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.email
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 4 ? (
          <div className="trackDriverChoise">
            <ChoiseList
              name="customer"
              arrlist={clientListFull}
              setValue={setValue}
            />
          </div>
        ) : (
          findValueBy_Id(elem.odersId, clientListFull).value
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
