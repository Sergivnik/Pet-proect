import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findValueBy_Id } from "../myLib/myLib.js";

import "./editData.sass";

export const TrackAddTr = (props) => {
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const [editColNumber, setEditColNumber] = useState(1);
  const [addTrackObj, setAddTrackObj] = useState({});

  const getKeyObj = (col) => {
    switch (col) {
      case 1:
        return "value";
      case 2:
        return "trackTrailerLicensePlate";
      case 3:
        return "model";
      default:
        break;
    }
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (addTrackObj.value != "" && addTrackObj.value != undefined) {
        let obj = { ...addTrackObj };
        obj[getKeyObj(editColNumber)] = e.currentTarget.value;
        props.handleAddTrack(obj);
      } else {
        setEditColNumber(1);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addTrackObj;
          obj.value = e.currentTarget.value;
          props.handleAddTrack(obj);
        }
      }
    }
    if (e.key == "Tab") {
      let obj = { ...addTrackObj };
      obj[getKeyObj(editColNumber)] = e.currentTarget.value;
      switch (editColNumber) {
        case 1:
          if (e.shiftKey) {
            setEditColNumber(editColNumber);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 2:
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(editColNumber + 1);
          }
          break;
        case 3:
          if (e.shiftKey) {
            setEditColNumber(editColNumber - 1);
          } else {
            setEditColNumber(1);
          }
          break;
        default:
          break;
      }
      setAddTrackObj(obj);
    }
  };

  useEffect(() => {
    let div = document.querySelector(".tableDiv");
    div.scrollTop = div.scrollHeight;
    if (props.driverId != null) {
      let { ...obj } = addTrackObj;
      obj.idOwner = props.driverId;
      setAddTrackObj(obj);
    }
  }, []);
  useEffect(() => {
    if (editColNumber > 0 && editColNumber != null) {
      let parent = document.querySelector(".driverAddTr");
      let input = parent.querySelector(".driverTrInput");
      input.focus();
    }
  }, [editColNumber]);

  return (
    <tr className="driverAddTr">
      <td className="trackTd">
        {findValueBy_Id(addTrackObj.idOwner, driversListFull).value}
      </td>
      <td className="trackTd">
        {editColNumber == 1 ? (
          <input
            type="text"
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
