import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignIn, authSignUp } from "../../actions/auth";
import "./auth.sass";

export const Auth = () => {
  const dispatch = useDispatch();

  const [btnName, setBtnName] = useState("Вход");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignIn = (e) => {
    let div = e.currentTarget;
    let siblings = div.parentNode.childNodes;
    siblings.forEach((node) => {
      node.style.borderBottom = "1px solid #000";
      node.style.backgroundColor = "#FFFFFF";
    });
    div.style.borderBottom = "none";
    div.style.backgroundColor = "#cdcdcd";
    setBtnName("Войти");
  };
  const handleClickSignUp = (e) => {
    let div = e.currentTarget;
    let siblings = div.parentNode.childNodes;
    siblings.forEach((node) => {
      node.style.borderBottom = "1px solid #000";
      node.style.backgroundColor = "#FFFFFF";
    });
    div.style.borderBottom = "none";
    div.style.backgroundColor = "#cdcdcd";
    setBtnName("Зарегистрироваться");
  };
  const handleChangeLogin = (e) => {
    setLogin(e.currentTarget.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };
  const handleClickBtn = () => {
    if (btnName === "Зарегистрироваться") {
      dispatch(authSignUp({ login: login, password: password }));
    }
    if (btnName === "Вход") {
      dispatch(authSignIn({ login: login, password: password }));
    }
  };
  return (
    <div className="authContainer">
      <div className="authWrap">
        <header className="authHeader">
          <div className="authHeaderSignIn" onClick={handleClickSignIn}>
            Войти
          </div>
          <div className="authHeaderSignUp" onClick={handleClickSignUp}>
            Зарегистрироваться
          </div>
        </header>
        <main className="authMain">
          <label className="authLabel">
            <span className="authSpan">Логин</span>
            <input
              className="authInput"
              type="text"
              value={login}
              onChange={handleChangeLogin}
            />
          </label>
          <label className="authLabel">
            <span className="authSpan">Пароль</span>
            <input
              className="authInput"
              type="password"
              value={password}
              onChange={handleChangePassword}
            />
          </label>
        </main>
        <footer className="authFooter">
          <button onClick={handleClickBtn}>{btnName}</button>
        </footer>
      </div>
    </div>
  );
};
