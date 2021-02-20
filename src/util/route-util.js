import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.needLogin === true ? (
        <Redirect to="/homepage" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
  <Route
    {...rest}
    render={(props) =>
      rest.needLogin !== true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
  )
  };
