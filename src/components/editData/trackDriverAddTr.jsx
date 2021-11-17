import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const TrackDraverAddTr = (props) => {
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const tracklist = useSelector((state) => state.oderReducer.tracklist);

  const [editColNumber, setEditColNumber] = useState(0);
  const [addDriverObj, setAddDriverObj] = useState({});

  const handleInputBlur = (e) => {
    console.log(e);
  };
  const handleEnter = (e) => {
    console.log(e);
  };
  const setValue = (e) => {
    console.log(e);
  };

  useEffect(() => {
    let div = document.querySelector(".EDFTableDiv");
    div.scrollTop = div.scrollHeight;
  }, []);
  return (
    <tr className="driverAddTr" onKeyDown={handleEnter}>
      <td className="trackDriverTd">
        {editColNumber == 0 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.value
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 1 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.name
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 2 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.shortName
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 3 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.passportNumber
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 4 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.department
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 5 ? (
          <input
            type="date"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          dateLocal(addDriverObj.dateOfIssue)
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 6 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.driverLicense
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 7 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addDriverObj.phoneNumber
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 8 ? (
          <ChoiseList
            name="owner"
            arrlist={driversListFull}
            setValue={setValue}
          />
        ) : (
          findValueBy_Id(addDriverObj.idOwner, driversListFull)
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 9 ? (
          <ChoiseList name="track" arrlist={tracklist} setValue={setValue} />
        ) : (
          findValueBy_Id(addDriverObj.idTrack, tracklist)
        )}
      </td>
    </tr>
  );
};
