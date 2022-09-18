import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InputText } from "../myLib/inputText.jsx";
import { sendEmail } from "../../actions/documentAction.js";

import "./userTrNew.sass";

export const FormAddEmailData = (props) => {
  const dispatch = useDispatch();

  let TD = props.TD;
  let divFormWidth = 500;
  let divFormHeight = 300;
  let windowWidth = document.documentElement.clientWidth;
  let windowHeight = document.documentElement.clientHeight;
  let leftTD = TD.getBoundingClientRect().left;
  let topTD = TD.getBoundingClientRect().top;
  let divFormLeft = windowWidth / 2 - divFormWidth / 2 - leftTD;
  let divFormTop = windowHeight / 2 - divFormHeight / 2 - topTD;

  const [emailData, setEmailData] = useState({ email: null, text: "" });
  const [isSendApp, setIsSendApp] = useState(false);

  const handleClickClose = () => {
    props.handleClickClose();
  };
  const getDataEmail = (name, text) => {
    let obj = { ...emailData };
    if (name == "emailAdd") obj.email = text;
    if (name == "textAdd") obj.text = text;
    setEmailData(obj);
  };
  const handleClickSend = () => {
    console.log(props.currentId, emailData.email, emailData.text);
    dispatch(
      sendEmail(props.currentId, emailData.email, emailData.text, isSendApp)
    );
    props.handleClickClose();
  };
  const handleChangeApp = () => {
    setIsSendApp(!isSendApp);
  };
  useEffect(() => {
    console.log(props);
    if (props.text) {
      let obj = { ...emailData };
      obj.text = props.text;
      setEmailData(obj);
    }
  }, []);
  return (
    <div
      style={{
        left: divFormLeft + "px",
        width: divFormWidth + "px",
        height: divFormHeight + "px",
        top: divFormTop + "px",
      }}
      className="formAddDocMainDiv"
    >
      <header className="formAddDocHeaser">
        <h3 className="formAddDocHeaderH3">
          Дополнительные данные для сообщения
        </h3>
        <svg width="20px" height="20px" onClick={handleClickClose}>
          <rect
            x="5%"
            y="48.5%"
            width="90%"
            height="10%"
            transform="rotate(45)"
          />
          <rect
            x="5%"
            y="48.5%"
            width="90%"
            height="10%"
            transform="rotate(-45)"
          />
        </svg>
      </header>
      <main>
        <div className="addEmailMainDiv">
          <span className="addEmailSpan">Добавить Email</span>
          <div className="addEmailWrapDiv">
            <InputText
              name="emailAdd"
              typeInput="text"
              getText={getDataEmail}
              text={emailData.email}
            />
          </div>
        </div>
        <div className="addEmailMainDiv">
          <span className="addEmailSpan">Добавить сообщение</span>
          <div className="addEmailWrapDiv height50">
            <InputText
              name="textAdd"
              typeInput="text"
              getText={getDataEmail}
              text={emailData.text}
            />
          </div>
        </div>
        <div className="addEmailApp">
          <span className="addEmailAppSpan">
            {props.typeDoc == "driverDocs"
              ? "Отправить докумены водителя"
              : "Отправить заявку"}
          </span>
          <input
            className="addEmailAppInput"
            type="checkbox"
            value={isSendApp}
            onChange={handleChangeApp}
          />
          <button className="addEmailSend" onClick={handleClickSend}>
            Отправить
          </button>
        </div>
      </main>
    </div>
  );
};
