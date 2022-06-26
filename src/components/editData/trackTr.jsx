import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editData, delData } from "../../actions/editDataAction.js";
import { findValueBy_Id } from "../myLib/myLib.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const TrackTr = (props) => {
  const dispatch = useDispatch();
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);

  let elem = props.elem;
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [styleTr, setStyleTr] = useState(null);
  const [styleTd, setStileTd] = useState("trackTd");
  const [valueInput, setValueInput] = useState(null);

  const handleClickTr = (e) => {
    props.getCurrentId(elem._id);
    setStyleTr("driverActiveTr");
    setStileTd("trackTd tdZ10");
  };
  const handleDBLclick = (e) => {
    let column = e.currentTarget.cellIndex;
    setColNumber(column);
    switch (column) {
      case 1:
        setValueInput(elem.value);
        break;
      case 2:
        setValueInput(elem.trackTrailerLicensePlate);
        break;
      case 3:
        setValueInput(elem.model);
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
        case 1:
          obj.value = e.currentTarget.value;
          break;
        case 2:
          obj.trackTrailerLicensePlate = e.currentTarget.value;
          break;
        case 3:
          obj.model = e.currentTarget.value;
          break;
        default:
          break;
      }
      setColNumber(null);
      dispatch(editData(obj, "tracklist"));
    }
  };
  const setValue = (data) => {
    let { ...obj } = elem;
    obj.idOwner = data._id;
    dispatch(editData(obj, "tracklist"));
    setColNumber(null);
  };
  const handleClickDelete = () => {
    let password = prompt("Подтвердите удаление", "Пароль");
    if (password == "Пароль") {
      dispatch(delData(elem._id, "tracklist"));
    }
  };
  const handleChange = (e) => {
    setValueInput(e.currentTarget.value);
  };

  useEffect(() => {
    if (props.currentId != elem._id) {
      setColNumber(null);
      setStyleTr(null);
      setStileTd("trackTd");
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
          <div className="driverChoise">
            <ChoiseList
              name="drivers"
              arrlist={driversListFull}
              setValue={setValue}
            />
          </div>
        ) : (
          findValueBy_Id(elem.idOwner, driversListFull).value
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 1 ? (
          <input
            type="text"
            className="trackTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.value
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 2 ? (
          <input
            type="text"
            className="trackTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.trackTrailerLicensePlate
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 3 ? (
          <input
            type="text"
            className="trackTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.model
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
