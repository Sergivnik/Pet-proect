import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import { getPdf, sendEmail } from "../../actions/documentAction.js";
import { FormAddDoc } from "../userTrNew/formAddDoc.jsx";

export const TdAccountNumber = (props) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showInputFile, setShowInputFile] = useState(false);
  const [currentTD, setCurrentTD] = useState(null);

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
  const handleContaxtMenu = (e) => {
    e.preventDefault();
    setCurrentId(e.currentTarget.parentElement.id);
    setShowContextMenu(true);
  };
  const handleBlur = (e) => {
    setShowContextMenu(false);
  };
  const handleClickPrint = () => {
    dispatch(getPdf(currentId));
    setShowContextMenu(false);
  };
  const handleClickGenerate = () => {
    props.handleClickGenerate(props.currentTR);
    setShowContextMenu(false);
  };
  const handleClickAddDoc = (e) => {
    let TD = e.currentTarget.parentElement.parentElement;
    setCurrentTD(TD);
    setShowInputFile(true);
    setShowContextMenu(false);
  };
  const handleClickSendDoc = () => {
    dispatch(sendEmail(currentId));
    setShowContextMenu(false)
  };
  const handleClickClose = () => {
    setShowInputFile(false);
  };

  useEffect(() => {
    if (showContextMenu) {
      let DivContext = document.querySelector(".divContext");
      DivContext.focus();
    }
  }, [showContextMenu]);
  useEffect(() => {
    if (currentElement) currentElement.firstChild.firstChild.focus();
  }, [currentElement]);
  useEffect(() => {
    if (props.currentTR != currentId) {
      setShowEdit(false);
      setCurrentId(null);
      setShowContextMenu(false);
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
      onContextMenu={handleContaxtMenu}
    >
      {showEdit ? (
        <div className="divChoise">
          <input name="accountNumber" type="number" onKeyDown={handleEnter} />
        </div>
      ) : (
        props.accountNumber
      )}
      {showContextMenu ? (
        <div tabIndex="0" className="divContext" /* onBlur={handleBlur} */>
          <p className="contextmenu" onClick={handleClickGenerate}>
            Сформировать
          </p>
          <hr />
          <p className="contextmenu" onClick={handleClickPrint}>
            Печать
          </p>
          <hr />
          <p className="contextmenu" onClick={handleClickAddDoc}>
            Добавить ТТН
          </p>
          <hr />
          <p className="contextmenu" onClick={handleClickSendDoc}>
            Отправить Email
          </p>
          <hr />
        </div>
      ) : null}
      {showInputFile ? (
        <FormAddDoc
          TD={currentTD}
          currentId={currentId}
          handleClickClose={handleClickClose}
        />
      ) : null}
    </td>
  );
};
