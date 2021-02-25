import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/router.jsx";
import { Provider } from "react-redux";
import { initStore } from "./utils/store";
import rootReducer from "./reducers";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={initStore()}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
