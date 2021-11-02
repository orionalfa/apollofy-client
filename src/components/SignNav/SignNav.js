import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const SignNav = () => {
  const url = window.location.href;
  const array = url.split("/");
  const page = array[array.length - 1];

  return (
    <div className="signNav">
      <Link to="/login" className={page === "login" ? "current" : ""}>
        LOGIN
      </Link>
      <Link to="/register" className={page === "register" ? "current" : ""}>
        REGISTER
      </Link>
    </div>
  );
};

export default SignNav;
