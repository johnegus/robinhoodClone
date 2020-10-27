import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./util/route-util";
import LoginPanel from "./LoginPanel";
import PokemonBrowser from "./PokemonBrowser";

const App = ({ needLogin, loadToken }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          path="/login"
          exact={true}
          needLogin={needLogin}
          component={LoginPanel}
        />
        <PrivateRoute
          path="/"
          needLogin={needLogin}
          component={PokemonBrowser}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const AppContainer = () => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();
  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
