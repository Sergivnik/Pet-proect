import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import "./userTd.sass";

export const TdCompleted = (props)=>{
const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleDBLClick = (e) => {
    let element = e.currentTarget;
    if (props.edit ) {
      setShowEdit(true);
      element.parentElement.style.backgroundColor = "#fff";
      setCurrentId(e.currentTarget.parentElement.id);
    }
  };
  const handleClickRadio = (e) => {
    setShowEdit(false);
    props.deleteActive(e.target.value == "yes" ? true : false);
    dispatch(editOder(currentId, e.target.name, e.target.value == "yes" ? true : false));
  };

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
  useEffect(() => {
    if (props.currentTR != currentId) {
      setShowEdit(false);
      setCurrentId(null);
    }
  }, [props.currentTR]);

  return (
    <td className="userTd tdWidth150" onDoubleClick={handleDBLClick}>
      {showEdit ? (
        <div>
          <span>
            <input
              type="radio"
              name="completed"
              value="yes"
              onChange={handleClickRadio}
            />
            Ок
          </span>
          <span>
            <input
              type="radio"
              name="completed"
              value="no"
              onChange={handleClickRadio}
            />
            Нет
          </span>
        </div>
      ) : null}

      {!showEdit && (props.completed ? "Ок" : "Нет")}
    </td>
  );
}
