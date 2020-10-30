import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import PositionDetail from "./PositionDetail";
import PositionForm from "./PositionForm";
import Fab from "./Fab";
import { showForm } from "./store/actions/ui";
import { getPositions } from "./store/actions/positions";
import UserDetail from './UserDetail';


import SearchContainer from "./search/SearchContainer";

const PositionSidebar = ({ positions, getPositions, formVisible, showForm }) => {

  useEffect(() => {
    getPositions();
  }, []);

  const { id } = useParams();
  const positionId = Number.parseInt(id);

  if (!positions) {
    return null;
  }
  return (
    <main>
      <LogoutButton />
      
          
      <nav>
        <Switch>
      <SearchContainer />
          <Redirect to="/" />
          </Switch>
        <Fab hidden={formVisible} onClick={showForm} />
        <div>Stocks</div>
        {positions.map((position) => {
          return (
            <NavLink key={position.id} to={`/position/${position.id}`}>
              <div
                className={
                  positionId === position.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
                <div
                  className="nav-entry-image">{((position.currentPrice/position.buyPrice)*100-100).toFixed(0)}%</div>
                <div>
                  <div className="primary-text">{position.stockName}</div>
                  <div className="secondary-text">
                  {position.shares} share{ position.shares===1 ? '' : 's'} at ${position.currentPrice}     
                  </div>

                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
      {formVisible ? (
        <PositionForm />
      ) : (
        <Switch>
          <Route
            exact={true}
            path="/position/:id"
            render={(props) => <PositionDetail {...props} />}
          />
           <Route path="/" component={UserDetail} />
          
          
        </Switch>
      )}
    </main>
  );
};

const PositionSidebarContainer = () => {
  const formVisible = useSelector((state) => state.ui.formVisible);
  const positions = useSelector((state) => Object.values(state.positions));
  const dispatch = useDispatch();
  return (
    <PositionSidebar
      positions={positions}
      formVisible={formVisible}
      getPositions={() => dispatch(getPositions())}
      showForm={() => dispatch(showForm())}
    />
  );
};

export default PositionSidebarContainer;
