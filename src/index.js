import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./colors.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "./redux/provider";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./services/firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
