import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "./components/myLib/clock/clock.jsx";
import { DOMENNAME } from "./middlewares/initialState";
import "./app.sass";

export const App = () => {
  const [backgroundImage, setBackgroundImage] = useState();
  const [counter, setCounter] = useState(0);
  let divStyle = {
    backgroundImage: backgroundImage,
    height: "calc(100vh - 16px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {
    switch (counter) {
      case 0:
        setBackgroundImage(`url(${DOMENNAME}/img/trackPhone.png)`);
        break;
      case 1:
        setBackgroundImage(`url(${DOMENNAME}/img/trackPhone1.jpg)`);
        break;
      case 2:
        setBackgroundImage(`url(${DOMENNAME}/img/trackPhone3.png)`);
        break;
      case 3:
        setBackgroundImage(`url(${DOMENNAME}/img/trackPhone5.png)`);
        break;
      default:
        break;
    }
    setTimeout(() => {
      if (counter <= 3) {
        setCounter(counter + 1);
      } else {
        setCounter(0);
      }
    }, 10000);
    divStyle = {
      backgroundImage: backgroundImage,
      height: "calc(100vh - 16px)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }, [counter]);
  return (
    <div className="appRootDiv" style={divStyle}>
      <header className="appRootHeader">
        <div className="appRootLogo">
          <img
            className="appRootImg"
            src={`${DOMENNAME}/img/track.png`}
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
