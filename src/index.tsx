import "core-js/es/object/assign";
import "core-js/es/promise";
import "core-js/es/symbol";

import ReactDOM from "react-dom";

import "./i18n";

import App from "./App";
import "./index.css";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppLoader from "./cust/assets/AppLoader";
import { configureStore } from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<AppLoader />}>
      <Provider store={configureStore({})}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
