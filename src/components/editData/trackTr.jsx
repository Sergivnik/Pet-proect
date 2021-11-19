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

  const handleClickTr = (e) => {
    props.getCurrentId(elem._id);
    setStyleTr("driverActiveTr");
    setStileTd("trackTd trackDriverZ10");
  };
  const handleDBLclick = (e) => {
    let column = e.currentTarget.cellIndex;
    setColNumber(column);
    props.getCurrentId(elem._id);
    e.currentTarget.width = e.currentTarget.offsetWidth - 2 + "px";
    e.currentTarget.height = e.currentTarget.offsetHeight - 2 + "px";
    setCurrentElement(e.currentTarget);
  };
  const setValue = (data) => {};

  useEffect(() => {
    if (props.currentId != elem._id) {
      setColNumber(null);
      setStyleTr(null);
      setStileTd("trackTd");
    }
  }, [props.currentId]);

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
            //onKeyDown={handleEnter}
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
            //onKeyDown={handleEnter}
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
            //onKeyDown={handleEnter}
          />
        ) : (
          elem.model
        )}
      </td>
    </tr>
  );
};
