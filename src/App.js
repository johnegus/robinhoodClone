import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";

import { loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./util/route-util";
import LoginPanel from "./LoginPanel";
import PositionSidebar from "./PositionSidebar";
import SignUpForm from './SignUpForm';
import SearchDetailContainer from './search/SearchResults'
import NotFound from "./NotFound";
import HomePage from "./homepage/HomePage";
import UserDetailContainer from "./UserDetail";
import WatchedStockDetailContainer from "./StockDetail";
import PositionDetailContainer from "./PositionDetail";

const App = ({ needLogin, loadToken }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, [loadToken]);

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
        <ProtectedRoute
          path="/signup"
          exact={true}
          needLogin={needLogin}
          component={SignUpForm}
        />
        <ProtectedRoute
          path="/"
          exact={true}
          needLogin={needLogin}
          component={HomePage}
        />
        <PrivateRoute
          path="/dashboard"
          needLogin={needLogin}
          component={PositionSidebar}
        />
        
        {/* <PrivateRoute
          path="/dashboard/search"
          needLogin={needLogin}
          component={SearchDetailContainer}
        />
        <PrivateRoute
           
           path="/dashboard/position/:id"
           needLogin={needLogin}
           component={PositionDetailContainer}  
         />
         <PrivateRoute
          
          path="/dashboard/stock/:stockSymbol"
          needLogin={needLogin}
          component={WatchedStockDetailContainer}   
        />
        <PrivateRoute
          path="/dashboard/user"
          needLogin={needLogin}
          component={UserDetailContainer}
        /> */}
        
        {/* <Redirect to="/" /> */}
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
