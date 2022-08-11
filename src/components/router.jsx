import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { App } from "../App.jsx";
import { SomeComponent } from "./someComponent/someComonent.jsx";
import { Oders } from "./oders/oders.jsx";
import { Auth } from "./auth/auth.jsx";
import { useSelector } from "react-redux";

export const Router = () => {
  const [checkLogIn, setCheckLogIn] = useState(false);
  const test = useSelector((state) => state.oderReducer.yearconst);
  console.log(test);
  return (
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route
        exact
        path="/something"
        component={test.lastyeartxdebt ? SomeComponent : Auth}
      ></Route>
      <Route exact path="/oders" component={Oders}></Route>
      <Route exact path="/auth" component={Auth}></Route>
    </Switch>
  );
};
