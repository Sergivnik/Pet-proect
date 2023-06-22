import React from "react";
import { Link } from "react-router-dom";
import { DOMENNAME } from "../../../../middlewares/initialState";
import { Forecast } from "../../../forecast/forecast.jsx";
import "./menuAccount.sass";

export const MenuAccount = (props) => {
  return (
    <div className="wrapperForAccount">
      <div className="orderLogo">
        <Link to="/">
          <img
            className="orderLogoImg"
            src={`${DOMENNAME}/img/track.jpg`}
            height="25"
            width="40"
          />
        </Link>
      </div>
      <div className="orderDivInfoSpan">
        <span>Рас.сч. </span>
        <span className="spanNoSpace">
          {props.sumAccount.toLocaleString()} руб.
        </span>
      </div>
      <div className="orderDivInfoSpan">
        <Forecast />
      </div>
    </div>
  );
};
