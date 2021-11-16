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

  const handleClickTr = (e) => {
    props.getCurrentId(elem._id);
    setStyleTr("driverActiveTr");
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
    console.log(e);
  };
  const setValue = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (props.currentId != elem._id) {
      setColNumber(null);
      setStyleTr(null);
    }
  }, [props.currentId]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.focus();
  }, [currentElement]);
  return (
    <tr onClick={handleClickTr} className={styleTr}>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
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
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 1 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          elem.name
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 2 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          elem.shortName
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 3 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          elem.passportNumber
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 4 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          elem.department
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 5 ? (
          <input
            type="date"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          dateLocal(elem.dateOfIssue)
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 6 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          elem.driverLicense
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 7 ? (
          <input
            type="text"
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          elem.phoneNumber
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 8 ? (
          <div className="trackDriverChoise">
            <ChoiseList
              name="owner"
              arrlist={driversListFull}
              setValue={setValue}
            />
          </div>
        ) : (
          findValueBy_Id(elem.idOwner, driversListFull).value
        )}
      </td>
      <td className="trackDriverTd" onDoubleClick={handleDBLclick}>
        {colNumber == 9 ? (
          <div className="trackDriverChoise">
            <ChoiseList name="owner" arrlist={tracklist} setValue={setValue} />
          </div>
        ) : (
          findValueBy_Id(elem.idTrack, tracklist).value
        )}
      </td>
    </tr>
  );
};
