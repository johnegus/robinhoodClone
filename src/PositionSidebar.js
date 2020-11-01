import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import PositionDetail from "./PositionDetail";
import PositionForm from "./PositionForm";
import Fab from "./Fab";
import { showForm } from "./store/actions/ui";
import { getPositions } from "./store/actions/positions";
import {getWatchedStocks} from './store/actions/watched-stocks'
import UserDetail from './UserDetail';



import SearchContainer from "./search/SearchContainer";

const PositionSidebar = ({ positions, getPositions, getWatchedStocks, formVisible, showForm, watchedStocks }) => {

  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    getWatchedStocks();
  }, []);

  const { id } = useParams();
  const positionId = Number.parseInt(id);

  if (!positions) {
    return null;
  }

  if (!watchedStocks) {
    return null;
  }
  return (
    <main>
      <LogoutButton />
      
          
      <nav>
        <Switch>
      <SearchContainer />
      
      
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
        <div>Watchlist</div>
        {watchedStocks.map((watchedStock) => {
          return (
            <NavLink key={watchedStock.id} to={`/watchlist/${watchedStock.id}`}>
              <div
                className={
                  positionId === watchedStock.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
                <div
                  className="nav-entry-image">{watchedStock.currentPrice}</div>
                <div>
                  <div className="primary-text">{watchedStock.stockName}</div>
                  <div className="secondary-text">
                  
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
  const watchedStocks = useSelector((state) => Object.values(state.watchedStocks));
  const dispatch = useDispatch();
  return (
    <PositionSidebar
      positions={positions}
      watchedStocks={watchedStocks}
      formVisible={formVisible}
      getWatchedStocks={() => dispatch(getWatchedStocks())}
      getPositions={() => dispatch(getPositions())}
      showForm={() => dispatch(showForm())}
    />
  );
};

export default PositionSidebarContainer;
