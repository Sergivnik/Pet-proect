import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { dateLocal } from "../myLib/myLib.js";

export const TdDriverPayment = (props) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  let mouseOut = true;

  const handleMouseOver = () => {
    mouseOut = false;
    setTimeout(() => {
      if (!mouseOut) {
        if (props.dateOfPayment) setShowDetails(true);
      }
    }, 500);
  };
  const handleMouseLeave = () => {
    mouseOut = true;
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
    dispatch(editOder(currentId, "driverPayment", data._id));
    setShowEdit(false);
    setCurrentId(null);
    setCurrentElement(null);
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
    <td
      className="odersTd"
      onDoubleClick={handleDBLClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {showEdit ? (
        <div className="divChoise">
          <ChoiseList
            name="driverPayment"
            parent="oders"
            arrlist={[
              { _id: 1, value: "Ок" },
              { _id: 2, value: "Нет" },
            ]}
            setValue={setValue}
          />
        </div>
      ) : (
        props.driverPayment
      )}
      {showDetails && (
        <div className="oderTdTooltip">
          <p className="userPTooltip">
            {props.dateOfPayment ? dateLocal(props.dateOfPayment) : null}
          </p>
        </div>
      )}
    </td>
  );
};
