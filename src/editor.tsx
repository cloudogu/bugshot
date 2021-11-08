import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./editor/GlobalStyles";
import Editor from "./editor/Editor";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Editor />
  </React.StrictMode>,
  document.getElementById("root")
);
