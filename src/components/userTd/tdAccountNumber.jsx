import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOder } from "../../actions/oderActions.js";
import {
  getPdf,
  getWithoutStampPdf,
  sendEmail,
} from "../../actions/documentAction.js";
import { FormAddDoc } from "../userTrNew/formAddDoc.jsx";
import { FormAddEmailData } from "../userTrNew/fornAddEmailData.jsx";
import { UserWindow } from "../userWindow/userWindow.jsx";
import { AppFormExtra } from "../documents/appFormExtra.jsx";

export const TdAccountNumber = (props) => {
  const orderList = useSelector((state) => state.oderReducer.odersList);
  const order = props.elem
    ? orderList.find((elem) => elem._id == props.elem._id)
    : null;
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showInputFile, setShowInputFile] = useState(false);
  const [showEmailData, setShowEmailData] = useState(false);
  const [showAppForm, setShowAppForm] = useState(false);
  const [currentTD, setCurrentTD] = useState(null);
  const [showContextEmail, setShowContextEmail] = useState(true);
  const [typeDoc, setTypeDoc] = useState(null);
  const [appBtn, setAppBtn] = useState("");
  const [top, setTop] = useState(0);
  const [classTD, setClassTD] = useState("odersTd");

  const handleDBLClick = (e) => {
    let element = e.currentTarget;
    if (e.target.tagName != "TD") return false;
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
    let a = dispatch(getPdf(currentId, "ttn"));
    console.log(a);
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
  const handleClickSendDoc = (e) => {
    let TD = e.currentTarget.parentElement.parentElement;
    setCurrentTD(TD);
    setShowEmailData(true);
    //dispatch(sendEmail(currentId));
    setShowContextMenu(false);
  };
  const handleClickClose = (isSuccess) => {
    setShowInputFile(false);
    setShowEmailData(false);
    if (isSuccess) alert("Не забудьте внести номер заявки в заказ!!!");
  };
  const handleClikPrintApp = (e) => {
    if (appBtn == "Печать заявки") {
      dispatch(getPdf(currentId, "app"));
      setShowContextMenu(false);
    } else {
      let elem = e.currentTarget;
      if (elem) console.log(elem, elem.getBoundingClientRect());
      setTop(Math.round(elem.getBoundingClientRect().y - 200));
      setShowAppForm(true);
      setShowContextMenu(false);
    }
  };
  const handleClickUserWindowClose = () => {
    setShowAppForm(false);
  };

  useEffect(() => {
    if (showContextMenu) {
      let DivContext = document.querySelector(".divContext");
      let customerPayment = props.customerPayment;
      if (
        customerPayment == "Нет" ||
        customerPayment == "Печать" ||
        customerPayment == "Мыло" ||
        customerPayment == "Ок" ||
        customerPayment == "Почта"
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
    if (props.elem) {
      if (props.currentTR == props.elem._id && props.elem.applicationNumber) {
        console.log(props.currentTR, props.elem._id);
        setClassTD("odersTd backGroundGrey");
      } else {
        setClassTD("odersTd");
      }
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
    if (order) {
      if (order.applicationNumber) {
        setAppBtn("Печать заявки");
      } else {
        setAppBtn("Создать заявку");
      }
    }
  }, [orderList]);

  return (
    <td
      className={classTD}
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
            {appBtn}
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
      {showEmailData && (
        <FormAddEmailData
          TD={currentTD}
          currentId={currentId}
          typeDoc={typeDoc}
          handleClickClose={handleClickClose}
        />
      )}
      {showAppForm && (
        <UserWindow
          header="Оформление заявки"
          width={800}
          height={800}
          left="-50vw"
          top={`-${top}px`}
          handleClickWindowClose={handleClickUserWindowClose}
          windowId="fillApplication"
        >
          <AppFormExtra id={props.elem._id} />
        </UserWindow>
      )}
    </td>
  );
};
