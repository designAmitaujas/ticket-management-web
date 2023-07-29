import "core-js/es/object/assign";
import "core-js/es/promise";
import "core-js/es/symbol";

import ReactDOM from "react-dom";

import "./i18n";

import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./redux/store";

ReactDOM.render(
  <Provider store={configureStore({})}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
