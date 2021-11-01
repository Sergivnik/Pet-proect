import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";

export const TdDriver = (props) => {
  const dispatch = useDispatch();
  const driversList = useSelector((state) => state.oderReducer.driverlist);
  const trackDriverList = useSelector(
    (state) => state.oderReducer.trackdrivers
  );
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const getValue = (id, arrObj) => {
    if (id) {
      let value = arrObj.find((elem) => elem._id == id);
      return value.value;
    }
  };
  const handleMouseOver = () => {
    if (props.idTrackDriver) setShowDetails(true);
  };
  const handleMouseLeave = () => {
    setShowDetails(false);
  };
  const handleDBLClick = (e) => {
    let element = e.currentTarget;
    if (props.edit) {
      setShowEdit(true);
      e.currentTarget.parentElement.style.backgroundColor = "#fff";
      setCurrentId(e.currentTarget.parentElement.id);
      setCurrentElement(element);
    }
  };
  const setValue = (data) => {
    console.log(currentId, "driver", data._id);
    dispatch(editOder(currentId, "driver", data._id));
    setShowEdit(false);
    setCurrentId(null);
    setCurrentElement(null);
  };
  const handleESC = (e) => {
    if (e.code == "Escape") {
      setShowEdit(false);
      setCurrentId(null);
      setCurrentElement(null);
    }
  };
  useEffect(() => {
    if (currentElement) currentElement.firstChild.firstChild.focus();
  }, [currentElement]);
  useEffect(() => {
    if (props.currentTR != currentId) {
      setShowEdit(false);
      setCurrentId(null);
    }
  }, [props.currentTR]);
  return (
    <td
      className="userTd"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDBLClick}
      onKeyDown={handleESC}
    >
      {showEdit ? (
        <div className="divChoise">
          <ChoiseList name="driver" arrlist={driversList} setValue={setValue} />
        </div>
      ) : (
        getValue(props.idDriver, driversList)
      )}
      {showDetails && (
        <div className="oderTdTooltip">
          {getValue(props.idTrackDriver, trackDriverList)}
        </div>
      )}
    </td>
  );
};
