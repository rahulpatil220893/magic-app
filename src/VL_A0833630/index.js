import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

require("webpack-jquery-ui");
// require("jquery-ui-touch-punch");
require("../app/helpers/jquery.ui.touch-punch");

ReactDOM.render(<App />, document.getElementById("root"));
