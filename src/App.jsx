import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "./components/myLib/clock/clock.jsx";
import { DOMENNAME } from "./middlewares/initialState";
import "./app.sass";

export const App = () => {
  const backgroundImage = `url(${DOMENNAME}/img/trackPhone.png)`;
  const divStyle = {
    backgroundImage: backgroundImage,
    height: "calc(100vh - 16px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className="appRootDiv" style={divStyle}>
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
      <div className="appClockContainer">
        <Clock size={175} color={`#0000ff`} />
      </div>
    </div>
  );
};
