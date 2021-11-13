import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editData } from "../../actions/editDataAction.js";

import "./editData.sass";

export const DriverTableTR = (props) => {
  const dispatch = useDispatch();
  let elem = props.elem;
  const [colNumber, setColNumber] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);

  const handleDBLclick = (e) => {
    setColNumber(e.currentTarget.cellIndex);
    props.getCurrentId(elem._id);
    console.log(e.currentTarget.offsetWidth);
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
          obj.compfnyName = e.currentTarget.value;
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

  useEffect(() => {
    if (props.currentId != elem._id) setColNumber(null);
  }, [props.currentId]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.focus();
  }, [currentElement]);
  return (
    <tr key={"driver" + elem._id}>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 0 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
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
          />
        ) : (
          elem.compfnyName
        )}
      </td>
      <td className="driverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 3 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
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
        ) : (
          elem.active
        )}
      </td>
    </tr>
  );
};
