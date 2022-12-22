import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import { ChoiseList } from "../choiseList/choiseList.jsx";
import { dateLocal } from "../myLib/myLib.js";
import "./userTd.sass";

export const TdDocument = (props) => {
  const user = useSelector((state) => state.oderReducer.currentUser);

  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [docList, setDocList] = useState([
    { _id: 2, value: "Нет" },
    { _id: 3, value: "Факс" },
    { _id: 4, value: "Сдал" },
  ]);
  const [classTd, setClassTd] = useState("userTd");

  let mouseOut = true;

  const handleMouseOver = () => {
    mouseOut = false;
    setTimeout(() => {
      if (!mouseOut) if (props.dateOfSubmission) setShowDetails(true);
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
    let check = true;
    if (props.document == "Ок") {
      check = confirm("100%?");
    }
    console.log(currentId, "document", data._id);
    if (check) {
      dispatch(editOder(currentId, "document", data._id));
      setShowEdit(false);
      setCurrentId(null);
      setCurrentElement(null);
    } else {
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
  useEffect(() => {
    if (user.role == "admin") {
      setDocList([
        { _id: 1, value: "Ок" },
        { _id: 2, value: "Нет" },
        { _id: 3, value: "Факс" },
        { _id: 4, value: "Сдал" },
      ]);
    } else {
      setDocList([
        { _id: 2, value: "Нет" },
        { _id: 3, value: "Факс" },
        { _id: 4, value: "Сдал" },
      ]);
    }
  }, []);
  useEffect(() => {
    console.log(props.elem.wasItPrinted);
    if (props.elem) {
      if (props.elem.wasItPrinted) {
        setClassTd("userTd wasPrinted");
      } else {
        setClassTd("userTd");
      }
    }
  }, [props]);

  return (
    <td
      className={classTd}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDBLClick}
    >
      {showEdit ? (
        <div className="divChoise">
          <ChoiseList
            name="document"
            parent="oders"
            arrlist={docList}
            setValue={setValue}
          />
        </div>
      ) : (
        props.document
      )}
      {showDetails && (
        <div className="oderTdTooltip">{dateLocal(props.dateOfSubmission)}</div>
      )}
    </td>
  );
};
