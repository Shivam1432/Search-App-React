import { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
//import App from "./App";
import SearchApp from "./SearchApp.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <StrictMode>
      <SearchApp />
    </StrictMode>
  </>,
  rootElement
);
