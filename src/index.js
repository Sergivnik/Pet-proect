import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/router.jsx";
import { Provider } from "react-redux";
import { initStore } from "./utils/store";

ReactDOM.render(
  <Provider store={initStore()}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
