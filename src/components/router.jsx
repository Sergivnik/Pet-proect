import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { App } from "../App.jsx";
import { SomeComponent } from "./someComponent/someComonent.jsx";
import { Oders } from "./oders/oders.jsx";
import { Auth } from "./auth/auth.jsx";
import { useSelector, useDispatch } from "react-redux";
import { authGetUser } from "../actions/auth.js";

export const Router = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authGetUser());
  }, [dispatch]);
  const user = useSelector((state) => state.oderReducer.currentUser);
  console.log(user);
  let checkUser = false;
  if (user.name) checkUser = true;
  return (
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route
        exact
        path="/something"
        component={checkUser ? SomeComponent : Auth}
      ></Route>
      <Route exact path="/oders" component={checkUser ? Oders : Auth}></Route>
      <Route
        exact
        path="/auth"
        component={user.role == "admin" || !checkUser ? Auth : App}
      ></Route>
    </Switch>
  );
};
