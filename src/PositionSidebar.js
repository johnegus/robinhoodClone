import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, Switch, useParams } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import PositionDetail from "./PositionDetail";

import { getPositions, updatePositionAndGet } from "./store/actions/positions";
import {getWatchedStocks} from './store/actions/watched-stocks'
import {getHistoricalData} from './store/actions/history'
import UserDetail from './UserDetail';
import WatchListDetail from './WatchListDetail';
import { exitWatchedStock } from './store/actions/watched-stocks'


import SearchContainer from "./search/SearchContainer";

const PositionSidebar = ({ positions, formVisible, watchedStocks, updatePositionAndGet }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWatchedStocks());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getHistoricalData());
  }, [dispatch]);

  //updatepositions =================================================================================
  const [flag, setflag] = useState(0)
  const [posLen,setPosLen ] = useState(0)
  useEffect(()=>{
     if(posLen !== positions.length){

      const delay=()=>{
        setTimeout(()=>{
          delay()
          const API_Key = process.env.REACT_APP_FMP_API_KEY;
          let stockSymbols = positions.map(m=>{return m.stockSymbol}).join(',')
          let API_CALL = `https://financialmodelingprep.com/api/v3/profile/${stockSymbols}?apikey=${API_Key}`;
          fetch(API_CALL)
          .then((response)=>{
            return response.json()
          }).then((data)=>{
            data.map(m=>{
              return updatePositionAndGet({
                stockSymbol:m.symbol,
                currentPrice:m.price
              })
            })
            
            getPositions();
          })  
        },100000)
      }
      delay()
      setPosLen(positions.length);
    }
  },[positions,posLen])
  useEffect(() => {
    
    
    if(positions.length===0 && flag===0){
      setflag(1)
      getPositions();
    }
  },[positions.length, flag, getPositions]);

  

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
       
        <div className='sidebar-label'>Stocks</div>
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


                <div className={`${parseFloat(100*(position.currentPrice - position.buyPrice)/position.buyPrice).toFixed(2) > 0
                 ? "green" : "red"}`} 
                  >{parseFloat(100*(position.currentPrice - position.buyPrice)/position.buyPrice).toFixed(2)}%</div>
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
        <div className='sidebar-label'>Watchlist</div>
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
                <div className={`${((Math.random() * 3.00) + 1).toFixed(2) *(Math.round(Math.random()) * 2 - 1) > 0
                 ? "green" : "red"}`} 
                  >{((Math.random() * 3.00) + 1).toFixed(2) *(Math.round(Math.random()) * 2 - 1)}%</div>
                <div>
                  <div className="primary-text">{watchedStock.stockName}</div>
                  <div className="secondary-text">
                  <span onClick={async ()=> await dispatch(exitWatchedStock(watchedStock.id))} >Delete</span>
                  </div>

                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
      
        <Switch>
          <Route
            exact={true}
            path="/watchlist/:id"
            render={(props) => <WatchListDetail {...props} />}//component = {WatchLIstdetail}?
          />
          <Route
            exact={true}
            path="/position/:id"
            render={(props) => <PositionDetail {...props} />}  
          />
           <Route exact={true} path="/" component={UserDetail} />
        </Switch>
      
    </main>
  );
};

const PositionSidebarContainer = () => {
  const positions = useSelector((state) => Object.values(state.positions));
  const watchedStocks = useSelector((state) => Object.values(state.watchedStocks));
  const history = useSelector((state) => Object.values(state.history));
  const dispatch = useDispatch();
  return (
    <PositionSidebar
      positions={positions}
      watchedStocks={watchedStocks}
      history={history}
      updatePositionAndGet={(data)=>{
        dispatch(updatePositionAndGet(data))
      }}
      
      exitWatchedStock={(id) => dispatch(exitWatchedStock(id))}
    />
  );
};

export default PositionSidebarContainer;
