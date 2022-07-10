import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import {
  getPdf,
  getWithoutStampPdf,
  sendEmail,
} from "../../actions/documentAction.js";
import { FormAddDoc } from "../userTrNew/formAddDoc.jsx";

export const TdAccountNumber = (props) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showInputFile, setShowInputFile] = useState(false);
  const [currentTD, setCurrentTD] = useState(null);
  const [showContextEmail, setShowContextEmail] = useState(true);
  const [typeDoc, setTypeDoc] = useState(null);

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
  const handleDeleteBill = () => {
    dispatch(editOder(currentId, "accountNumber", null));
    setShowEdit(false);
    setCurrentId(null);
    setCurrentElement(null);
    setShowContextMenu(false);
  };
  const handleContaxtMenu = (e) => {
    e.preventDefault();
    setCurrentId(e.currentTarget.parentElement.id);
    setShowContextMenu(true);
  };
  const handleClickPrint = () => {
    dispatch(getPdf(currentId, "doc"));
    setShowContextMenu(false);
  };
  const handleClickPrintTTN = () => {
    dispatch(getPdf(currentId, "ttn"));
    setShowContextMenu(false);
  };
  const handleClickPrintWithoutStamp = () => {
    dispatch(getWithoutStampPdf(currentId));
    setShowContextMenu(false);
  };
  const handleClickGenerate = () => {
    props.handleClickGenerate(props.currentTR);
    setShowContextMenu(false);
  };
  const handleClickAddDoc = (e, typeDoc) => {
    let TD = e.currentTarget.parentElement.parentElement;
    setCurrentTD(TD);
    setShowInputFile(true);
    setShowContextMenu(false);
    setTypeDoc(typeDoc);
  };
  const handleClickSendDoc = () => {
    dispatch(sendEmail(currentId));
    setShowContextMenu(false);
  };
  const handleClickClose = () => {
    setShowInputFile(false);
  };
  const handleClikPrintApp = () => {
    dispatch(getPdf(currentId, "app"));
    setShowContextMenu(false);
  };

  useEffect(() => {
    if (showContextMenu) {
      let DivContext = document.querySelector(".divContext");
      let customerPayment = props.customerPayment;
      if (
        customerPayment == "Нет" ||
        customerPayment == "Печать" ||
        customerPayment == "Мыло"
      ) {
        setShowContextEmail(true);
      } else {
        setShowContextEmail(false);
      }
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
          {/* <p className="contextmenu" onClick={handleClickGenerate}>
            Сформировать
          </p>
          <hr /> */}
          <p className="contextmenu" onClick={handleClickPrint}>
            Печать
          </p>
          <p className="contextmenu" onClick={handleClickPrintWithoutStamp}>
            Печать без штампа
          </p>
          <p className="contextmenu" onClick={handleClikPrintApp}>
            Печать заявки
          </p>
          <p className="contextmenu" onClick={handleClickPrintTTN}>
            Печать ТТН
          </p>
          <hr className="contextMenuHr" />
          <p
            className="contextmenu"
            onClick={(e) => handleClickAddDoc(e, "ttn")}
          >
            Добавить ТТН
          </p>
          <p
            className="contextmenu"
            onClick={(e) => handleClickAddDoc(e, "app")}
          >
            Добавить Заявку
          </p>
          <hr className="contextMenuHr" />
          {showContextEmail && (
            <p className="contextmenu" onClick={handleClickSendDoc}>
              Отправить Email
            </p>
          )}
          <hr className="contextMenuHr" />
          <p className="contextmenu" onClick={handleDeleteBill}>
            Удалить счет
          </p>
        </div>
      ) : null}
      {showInputFile ? (
        <FormAddDoc
          TD={currentTD}
          currentId={currentId}
          typeDoc={typeDoc}
          handleClickClose={handleClickClose}
        />
      ) : null}
    </td>
  );
};
