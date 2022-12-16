import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./app.sass";
import { DOMENNAME } from "./middlewares/initialState";

export const App = () => {
  return (
    <div className="appRootDiv">
      <header className="appRootHeader">
        <div className="appRootLogo">
          <img
            className="appRootImg"
            src={`${DOMENNAME}/img/track3.png`}
            height="50"
            width="80"
          />
        </div>
        <div className="appRootMenu">
          <Link to="/">Home</Link>
          <Link to="/something">Something</Link>
          <Link to="/oders">Заказы</Link>
          <Link to="/customer">Клиент</Link>
          <Link to="/auth">Вход</Link>
        </div>
      </header>
    </div>
  );
};
