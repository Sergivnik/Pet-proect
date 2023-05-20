import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "./components/myLib/clock/clock.jsx";
import { DOMENNAME } from "./middlewares/initialState";
import { Canvas } from 'react-three-fiber';
import "./app.sass";

export const App = () => {
  const slogans = [
    "Наша компания - ваш надежный партнер в перевозках.",
    "Гарантированная безопасность и сохранность ваших грузов.",
    "Мы доставим ваш груз туда, куда вам нужно, без проблем.",
    "Ваш груз в надежных руках – доверьтесь профессионалам.",
  ];
  const [backgroundImage, setBackgroundImage] = useState();
  const [counter, setCounter] = useState(null);
  const [preloadImages, setPreloadImages] = useState([]);
  const [currentSlogan, setCurrentSlogan] = useState(slogans[0]);
  const [displayText, setDisplayText] = useState(false);

  let divStyle = {
    backgroundImage: backgroundImage,
    height: "calc(100vh - 16px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  useEffect(() => {
    const images = [
      `${DOMENNAME}/img/trackPhone.png`,
      `${DOMENNAME}/img/trackPhone1.jpg`,
      `${DOMENNAME}/img/trackPhone3.png`,
      `${DOMENNAME}/img/trackPhone5.png`,
    ];
    const preload = [];
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
      preload.push(img);
    });
    setPreloadImages(preload);
    setCounter(0);
  }, []);
  useEffect(() => {
    switch (counter) {
      case 0:
        setBackgroundImage(`url(${preloadImages[1].src}`);
        setCurrentSlogan(slogans[0]);
        setDisplayText(true);
        break;
      case 1:
        setBackgroundImage(`url(${preloadImages[0].src}`);
        setCurrentSlogan(slogans[1]);
        setDisplayText(true);
        break;
      case 2:
        setBackgroundImage(`url(${preloadImages[2].src}`);
        setCurrentSlogan(slogans[2]);
        setDisplayText(true);
        break;
      case 3:
        setBackgroundImage(`url(${preloadImages[3].src}`);
        setCurrentSlogan(slogans[3]);
        setDisplayText(true);
        break;
      default:
        break;
    }
    setTimeout(() => {
      if (counter < 3) {
        setCounter(counter + 1);
      } else {
        setCounter(0);
      }
      setTimeout(() => {
        setDisplayText(false);
      }, 8250);
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
      <div className={`appSloganContainer ${displayText ? "visible" : ""}`}>
        <h1>{currentSlogan}</h1>
      </div>
      <div className="appClockContainer">
        <Clock size={175} color={`#0000ff`} />
      </div>
      <Canvas></Canvas>
    </div>
  );
};
