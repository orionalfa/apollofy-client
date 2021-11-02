import React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

function withoutAuth(WrappedComponent) {
  function WrapperComponent() {
    const isAuthorized = useSelector((state) => state.isAuthorized);

    return (
      <>{!isAuthorized.value ? <WrappedComponent /> : <Redirect to="/" />}</>
    );
  }

  return WrapperComponent;
}

export default withoutAuth;
