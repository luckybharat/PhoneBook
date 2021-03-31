import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useConsumerAuth } from "../context/Index";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { consumer } = useConsumerAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return consumer ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
