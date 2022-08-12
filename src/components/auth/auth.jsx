import React from "react";
import "./auth.sass";

export const Auth = () => {
  const handleClickSignIn = (e) => {
    let div = e.currentTarget;
    let siblings = div.parentNode.childNodes;
    siblings.forEach((node) => (node.style.borderBottom = "1px solid #000"));
    div.style.borderBottom = "none";
  };
  return (
    <div className="authContainer">
      <div className="authWrap">
        <header className="authHeader">
          <div className="authHeaderSignIn" onClick={handleClickSignIn}>
            Войти
          </div>
          <div className="authHeaderSignUp" onClick={handleClickSignIn}>
            Зарегистрироваться
          </div>
        </header>
        <main className="authMain">
          <label className="authLabel">
            <span className="authSpan">Логин</span>
            <input className="authInput" />
          </label>
          <label className="authLabel">
            <span className="authSpan">Пароль</span>
            <input className="authInput" />
          </label>
        </main>
        <footer className="authFooter">
          <button>Вход</button>
        </footer>
      </div>
    </div>
  );
};
