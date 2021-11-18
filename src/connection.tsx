import CreateConnection from "./connection/CreateConnection";
import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <CreateConnection />
  </React.StrictMode>,
  document.getElementById("root")
);
