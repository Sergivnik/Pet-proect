import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editData, delData } from "../../actions/editDataAction.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const CustomerTr = (props) => {
  const dispatch = useDispatch();

  let elem = props.elem;
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [styleTr, setStyleTr] = useState(null);
  const [styleTd, setStileTd] = useState("customerTd");

  const handleClickTr = () => {
    props.getCurrentId(elem._id);
    setStyleTr("customerActiveTr");
    setStileTd("customerTd tdZ10");
  };
  const handleDBLclick = (e) => {
    let column = e.currentTarget.cellIndex;
    setColNumber(column);
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
        default:
          break;
      }
    }
  };
  const handleRadio = (e) => {
    let { ...obj } = elem;
    obj.active = e.currentTarget.value;
    //dispatch(editData(obj, "drivers"));
    setColNumber(null);
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
          />
        ) : (
          elem.currentAccount
        )}
      </td>
      <td className={styleTd} onDoubleClick={handleDBLclick}>
        {colNumber == 5 ? (
          <input
            type="text"
            className="customerTrInput"
            onKeyDown={handleEnter}
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
      </td>
    </tr>
  );
};
