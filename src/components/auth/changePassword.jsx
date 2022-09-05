import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/auth";

import "./auth.sass";

export const ChangePassword = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.oderReducer.currentUser);

  const [login, setLogin] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const handleChangeLogin = (e) => {
    setLogin(e.currentTarget.value);
  };
  const handleChangeOldPassword = (e) => {
    setOldPassword(e.currentTarget.value);
  };
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.currentTarget.value);
  };
  const handleChangeCheckPassword = (e) => {
    setCheckPassword(e.currentTarget.value);
  };
  const handleClickBtn = () => {
    console.log(oldPassword, newPassword, checkPassword);
    let inputs = document.querySelectorAll(".changePasswordInput");
    if (newPassword == checkPassword) {
      dispatch(changePassword(login, oldPassword, newPassword));
      inputs.forEach((elem) => {
        elem.className = "changePasswordInput";
      });
    } else {
      inputs[2].className = "changePasswordInput red";
      inputs[3].className = "changePasswordInput red";
    }
  };
  return (
    <div className="changePasswordWraper">
      <h3 className="changePasswordHeader">Сменить пароль</h3>
      <main className="changePasswordMain">
        <label className="changePasswordLabel">
          <span className="changePasswordSpan">Логин</span>
          <input
            className="changePasswordInput"
            type="text"
            value={login}
            onChange={handleChangeLogin}
          />
        </label>
        <label className="changePasswordLabel">
          <span className="changePasswordSpan">Старый пароль</span>
          <input
            className="changePasswordInput"
            type="password"
            value={oldPassword}
            onChange={handleChangeOldPassword}
          />
        </label>
        <label className="changePasswordLabel">
          <span className="changePasswordSpan">Новый пароль</span>
          <input
            className="changePasswordInput"
            type="password"
            value={newPassword}
            onChange={handleChangeNewPassword}
          />
        </label>
        <label className="changePasswordLabel">
          <span className="changePasswordSpan">Повторить пароль</span>
          <input
            className="changePasswordInput"
            type="password"
            value={checkPassword}
            onChange={handleChangeCheckPassword}
          />
        </label>
      </main>
      <footer className="changePasswordFooter">
        <button onClick={handleClickBtn}>Сменить пароль</button>
      </footer>
    </div>
  );
};
