import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findValueBy_Id, dateLocal } from "../myLib/myLib.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

import "./editData.sass";

export const TrackDraverAddTr = (props) => {
  const driversListFull = useSelector((state) => state.oderReducer.driverlist);
  const tracklist = useSelector((state) => state.oderReducer.tracklist);

  const [editColNumber, setEditColNumber] = useState(0);
  const [addTrackDriverObj, setAddTrackDriverObj] = useState({});

  const handleInputBlur = (e) => {
    let { ...obj } = addTrackDriverObj;
    switch (editColNumber) {
      case 0:
        obj.value = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 1:
        obj.name = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 2:
        obj.shortName = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 3:
        obj.passportNumber = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 4:
        obj.department = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 5:
        obj.dateOfIssue = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 6:
        obj.driverLicense = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      case 7:
        obj.phoneNumber = e.currentTarget.value;
        setEditColNumber(editColNumber + 1);
        break;
      default:
        break;
    }
    setAddTrackDriverObj(obj);
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      if (addTrackDriverObj.value != "" && addTrackDriverObj.value != undefined) {
        props.handleAddTrackDriver(addTrackDriverObj);
      } else {
        setEditColNumber(0);
        if (e.currentTarget.tagName == "INPUT" && e.currentTarget.value != "") {
          let { ...obj } = addTrackDriverObj;
          obj.value = e.currentTarget.value;
          props.handleAddTrackDriver(obj);
        }
      }
    }
  };
  const setValue = (data) => {
    let { ...obj } = addTrackDriverObj;
    if (editColNumber == 8) {
      obj.idOwner = data._id;
      setEditColNumber(editColNumber + 1);
      setAddTrackDriverObj(obj);
    }
    if (editColNumber == 9) {
      if (obj.value != "") {
        obj.idTrack = data._id;
        setEditColNumber(null);
        props.handleAddTrackDriver(obj);
      } else {
        setEditColNumber(0);
      }
    }
  };

  useEffect(() => {
    let div = document.querySelector(".EDFTableDiv");
    div.scrollTop = div.scrollHeight;
  }, []);
  useEffect(() => {
    if (editColNumber < 8 && editColNumber != null) {
      let parent = document.querySelector(".driverAddTr");
      let input = parent.querySelector(".driverTrInput");
      input.focus();
    }
  }, [editColNumber]);

  return (
    <tr className="driverAddTr">
      <td className="trackDriverTd">
        {editColNumber == 0 ? (
          <input
            type="text"
            onBlur={handleInputBlur}
            className="driverTrInput"
            onKeyDown={handleEnter}
          />
        ) : (
          addTrackDriverObj.value
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
          addTrackDriverObj.name
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
          addTrackDriverObj.shortName
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
          addTrackDriverObj.passportNumber
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
          addTrackDriverObj.department
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
          dateLocal(addTrackDriverObj.dateOfIssue)
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
          addTrackDriverObj.driverLicense
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
          addTrackDriverObj.phoneNumber
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
          findValueBy_Id(addTrackDriverObj.idOwner, driversListFull).value
        )}
      </td>
      <td className="trackDriverTd">
        {editColNumber == 9 ? (
          <ChoiseList name="track" arrlist={tracklist} setValue={setValue} />
        ) : (
          findValueBy_Id(addTrackDriverObj.idTrack, tracklist).value
        )}
      </td>
    </tr>
  );
};
