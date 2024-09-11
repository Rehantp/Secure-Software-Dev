import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/GeneralTest/style.scss";

import "../node_modules/materialize-css/dist/js/materialize.min.js";
import { AuthContextProvide } from "./contexts/User_context/AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <AuthContextProvide>
    <App />
  </AuthContextProvide>
  //</React.StrictMode>
);
