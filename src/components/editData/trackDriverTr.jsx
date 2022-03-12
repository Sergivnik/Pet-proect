import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editData, delData } from "../../actions/editDataAction.js";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const TrackDriverTr = (props) => {
  const dispatch = useDispatch();
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const tracklist = useSelector((state) => state.oderReducer.tracklist);

  let elem = props.elem;
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [styleTr, setStyleTr] = useState(null);
  const [styleTd, setStileTd] = useState("trackDriverTd");
  const [valueInput, setValueInput] = useState(null);

  const dateToSqlString = (dateSomeFormate) => {
    let date = new Date(dateSomeFormate);
    let Year = date.getFullYear();
    let Month = date.getMonth() + 1;
    let Day = date.getDate();
    return `${Year}-${Month}-${Day}`;
  };

  const handleClickTr = (e) => {
    props.getCurrentId(elem._id);
    setStyleTr("driverActiveTr");
    setStileTd("trackDriverTd tdZ10");
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
        setValueInput(elem.shortName);
        break;
      case 3:
        setValueInput(elem.passportNumber);
        break;
      case 4:
        setValueInput(elem.department);
        break;
      case 5:
        setValueInput(elem.dateOfIssue);
        break;
      case 6:
        setValueInput(elem.driverLicense);
        break;
      case 7:
        setValueInput(elem.phoneNumber);
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
      obj.dateOfIssue = dateToSqlString(obj.dateOfIssue);
      switch (colNumber) {
        case 0:
          obj.value = e.currentTarget.value;
          break;
        case 1:
          obj.name = e.currentTarget.value;
          break;
        case 2:
          obj.shortName = e.currentTarget.value;
          break;
        case 3:
          obj.passportNumber = e.currentTarget.value;
          break;
        case 4:
          obj.department = e.currentTarget.value;
          break;
        case 5:
          obj.dateOfIssue = e.currentTarget.value;
          break;
        case 6:
          obj.driverLicense = e.currentTarget.value;
          break;
        case 7:
          obj.phoneNumber = e.currentTarget.value;
          break;
        default:
          break;
      }
      dispatch(editData(obj, "trackdrivers"));
      setColNumber(null);
    }
  };
  const setValue = (data) => {
    let { ...obj } = elem;
    obj.dateOfIssue = dateToSqlString(obj.dateOfIssue);
    if (data.field == "drivers") obj.idOwner = data._id;
    if (data.field == "tracklist") obj.idTrack = data._id;
    dispatch(editData(obj, "trackdrivers"));
    setColNumber(null);
  };
  const handleRadio = (e) => {
    let { ...obj } = elem;
    obj.dateOfIssue = dateToSqlString(obj.dateOfIssue);
    obj.fired = e.currentTarget.value;
    dispatch(editData(obj, "trackdrivers"));
    setColNumber(null);
  };
  const handleClickDelete = () => {
    let password = prompt("Подтвердите удаление", "Пароль");
    if (password == "Пароль") {
      dispatch(delData(elem._id, "trackdrivers"));
    }
  };
  const handleChange = (e) => {
    setValueInput(e.currentTarget.value);
  };

  useEffect(() => {
    if (props.currentId != elem._id) {
      setColNumber(null);
      setStyleTr(null);
      setStileTd("trackDriverTd");
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
            className="driverTrInput"
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
            className="driverTrInput"
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
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.shortName
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 3 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.passportNumber
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 4 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.department
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 5 ? (
          <input
            type="date"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          dateLocal(elem.dateOfIssue)
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 6 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.driverLicense
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 7 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
            onChange={handleChange}
            value={valueInput}
          />
        ) : (
          elem.phoneNumber
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 8 ? (
          <div className="trackDriverChoise">
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
        {colNumber == 9 ? (
          <div className="trackDriverChoise">
            <ChoiseList
              name="tracklist"
              arrlist={tracklist}
              setValue={setValue}
            />
          </div>
        ) : (
          findValueBy_Id(elem.idTrack, tracklist).value
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 10 ? (
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
        ) : elem.fired == 1 ? (
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
