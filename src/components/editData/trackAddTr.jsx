import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const TrackAddTr = (props) => {
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const [editColNumber, setEditColNumber] = useState(0);
  const [addTrackObj, setAddTrackObj] = useState({});

  const setValue = (data) => {
    let { ...obj } = addTrackObj;
    obj.idOwner = data._id;
    setEditColNumber(editColNumber + 1);
    setAddTrackObj(obj);
  };
  const handleInputBlur = (e) => {
    let { ...obj } = addTrackObj;
    switch (editColNumber) {
      case 1:
        obj.value = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 2:
        obj.trackTrailerLicensePlate = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 3:
        obj.model = e.currentTarget.value;
        break;
      default:
        break;
    }
    setAddTrackObj(obj);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (addTrackObj.value != "" && addTrackObj.value != undefined) {
        props.handleAddTrack(addTrackObj);
      } else {
        setEditColNumber(1);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addTrackObj;
          obj.value = e.currentTarget.value;
          props.handleAddTrack(obj);
        }
      }
    }
  };

  useEffect(() => {
    let div = document.querySelector(".tableDiv");
    div.scrollTop = div.scrollHeight;
  }, []);
  useEffect(() => {
    if (editColNumber > 0 && editColNumber != null ) {
      let parent = document.querySelector(".driverAddTr");
      let input = parent.querySelector(".driverTrInput");
      input.focus();
    }
  }, [editColNumber]);

  return (
    <tr className="driverAddTr">
      <td className="trackTd">
        {editColNumber == 0 ? (
          <ChoiseList
            name="owner"
            arrlist={driversListFull}
            setValue={setValue}
          />
        ) : (
          findValueBy_Id(addTrackObj.idOwner, driversListFull).value
        )}
      </td>
      <td className="trackTd">
        {editColNumber == 1 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addTrackObj.value
        )}
      </td>
      <td className="trackTd">
        {editColNumber == 2 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addTrackObj.trackTrailerLicensePlate
        )}
      </td>
      <td className="trackTd">
        {editColNumber == 3 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addTrackObj.model
        )}
      </td>
    </tr>
  );
};
