import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";

export const TdAccountNumber = (props) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);

  const handleDBLClick = (e) => {
    let element = e.currentTarget;
    if (props.edit) {
      setShowEdit(true);
      e.currentTarget.parentElement.style.backgroundColor = "#fff";
      setCurrentId(e.currentTarget.parentElement.id);
      setCurrentElement(element);
    }
  };
  const handleEnter = (e) => {
   if (e.key == "Enter") {
     dispatch(editOder(currentId, "accountNumber", e.currentTarget.value));
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
  useEffect(() => {
    const onKeypress = (e) => {
      if (e.code == "Escape") {
        if (showEdit) {
          setShowEdit(false);
          setCurrentId(null);
        }
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [showEdit]);

  return (
    <td className="odersTd" onDoubleClick={handleDBLClick}>
      {showEdit ? (
        <div className="divChoise">
          <input
            name="accountNumber"
            type="number"
            onKeyDown={handleEnter}
          />
        </div>
      ) : (
        props.accountNumber
      )}
    </td>
  );
};
