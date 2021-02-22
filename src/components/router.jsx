import React from "react";
import { Switch, Route } from "react-router-dom";
import { App } from "../App.jsx";
import {SomeComponent} from "./someComponent/someComonent.jsx"

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/something" component={SomeComponent}></Route>
    </Switch>
  );
};
