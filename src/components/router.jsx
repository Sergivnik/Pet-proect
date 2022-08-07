import React from "react";
import { Switch, Route } from "react-router-dom";
import { App } from "../App.jsx";
import { SomeComponent } from "./someComponent/someComonent.jsx";
import { Oders } from "./oders/oders.jsx";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/something" component={SomeComponent}></Route>
      <Route exact path="/oders" component={Oders}></Route>
      <Route exact path="/" component={App}></Route>
    </Switch>
  );
};
