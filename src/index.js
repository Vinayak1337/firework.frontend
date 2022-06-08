import ReactDom from "react-dom";
import React from "react";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import "./App.module.css";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
