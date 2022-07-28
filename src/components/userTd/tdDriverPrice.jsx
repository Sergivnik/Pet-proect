import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import "./userTd.sass";

export const TdDriverPrice = (props) => {
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);

  const handleDBLClick = (e) => {
    let element = e.currentTarget;
    if (props.edit && props.driverPayment != "Ок") {
      setShowEdit(true);
      e.currentTarget.parentElement.style.backgroundColor = "#fff";
      setCurrentId(e.currentTarget.parentElement.id);
      setCurrentElement(element);
    }
  };
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      dispatch(editOder(currentId, "driverPrice", e.currentTarget.value));
      setShowEdit(false);
      setCurrentId(null);
      setCurrentElement(null);
    }
    if (e.key == "Escape") {
      setShowEdit(false);
      setCurrentId(null);
    }
  };

  useEffect(() => {
    if (props.currentTR != currentId) {
      setShowEdit(false);
      setCurrentId(null);
    }
  }, [props.currentTR]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.focus();
  }, [currentElement]);
  return (
    <td className="userTd tdWidth150" onDoubleClick={handleDBLClick}>
      {showEdit ? (
        <input name="oderPrice" type="number" onKeyDown={handleEnter} />
      ) : (
        Number(props.driverPrice).toLocaleString()
      )}
    </td>
  );
};

