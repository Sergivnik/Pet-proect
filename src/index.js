import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/router.jsx";
import { Provider } from "react-redux";
import { initStore } from "./utils/store";

// ReactDOM.render(
//   <Provider store={initStore()}>
//     <BrowserRouter>
//       <Router />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );
createRoot(document.getElementById("root")).render(
  <Provider store={initStore()}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);
