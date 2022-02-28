import React from "react";
import { Route, Redirect } from "react-router-dom";

import { ACCESS_LEVEL_NORMAL_USER } from "../config/global_constants";

function LoggedInRoute({ children }) {
  return localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? (
    children
  ) : (
    <Redirect to="/shop" />
  );
}

export default LoggedInRoute;
