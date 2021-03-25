import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, Switch, useParams } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import PositionDetail from "./PositionDetail";

import { getPositions, updatePositionAndGet } from "./store/actions/positions";
import {getWatchedStocks, updateWatchedStockAndGet} from './store/actions/watched-stocks'
import {getHistoricalData} from './store/actions/ledger'
import UserDetail from './UserDetail';
import StockDetail from './StockDetail';

import { exitWatchedStock } from './store/actions/watched-stocks'


import SearchContainer from "./search/SearchContainer";

const PositionSidebar = ({ positions, formVisible, watchedStocks, updatePositionAndGet, updateWatchedStockAndGet }) => {
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
        },60000)
      }
      delay()
      setPosLen(positions.length);
    }
  },[positions, posLen, updatePositionAndGet])
  useEffect(() => {
    
    
    if(positions.length===0 && flag===0){
      setflag(1)
      getPositions();
    }
  },[positions.length, flag, updatePositionAndGet]);

  //updatewatchedstocks =================================================================================
  const [flag2, setflag2] = useState(0)
  const [posLen2,setPosLen2 ] = useState(0)
  useEffect(()=>{
     if(posLen2 !== watchedStocks.length){

      const delay=()=>{
        setTimeout(()=>{
          delay()
          const API_Key = process.env.REACT_APP_FMP_API_KEY;
          let stockSymbols = watchedStocks.map(m=>{return m.stockSymbol}).join(',')
          let API_CALL = `https://financialmodelingprep.com/api/v3/profile/${stockSymbols}?apikey=${API_Key}`;
          fetch(API_CALL)
          .then((response)=>{
            return response.json()
          }).then((data)=>{
            data.map(m=>{
              return updateWatchedStockAndGet({
                stockSymbol:m.symbol,
                currentPrice:m.price
              })
            })
            
            getWatchedStocks();
          })  
        },60000)
      }
      delay()
      setPosLen2(getWatchedStocks.length);
    }
  },[watchedStocks, posLen2, updateWatchedStockAndGet])
  useEffect(() => {
    
    
    if(watchedStocks.length===0 && flag2===0){
      setflag2(1)
      getWatchedStocks();
    }
  },[watchedStocks.length, flag2, updateWatchedStockAndGet]);

  

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
        {positions.slice(0).reverse().map((position) => {
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
        {watchedStocks.slice(0).reverse().map((watchedStock) => {
          return (
            <NavLink key={watchedStock.id} to={`/stock/${watchedStock.stockSymbol}`}>
              <div
                className={
                  positionId === watchedStock.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
                <div className='purple' 
                  >${watchedStock.currentPrice}</div>
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
           
            path="/position/:id"
            render={(props) => <PositionDetail {...props} />}  
          />
          <Route
           
           path="/stock/:stockSymbol"
           render={(props) => <StockDetail {...props} />}  
         />
          
           <Route exact={true} path="/" component={UserDetail} />
           {/* <Route component={PositionSidebar} />
           <Route component={NotFound} /> */}
        </Switch>
      
    </main>
  );
};

const PositionSidebarContainer = () => {
  const positions = useSelector((state) => Object.values(state.positions));
  const watchedStocks = useSelector((state) => Object.values(state.watchedStocks));
  const ledger = useSelector((state) => Object.values(state.ledger));
  const dispatch = useDispatch();
  return (
    <PositionSidebar
      positions={positions}
      watchedStocks={watchedStocks}
      ledger={ledger}
      updatePositionAndGet={(data)=>{
        dispatch(updatePositionAndGet(data))
      }}
      updateWatchedStockAndGet={(data)=>{
        dispatch(updateWatchedStockAndGet(data))
      }}
      
      exitWatchedStock={(id) => dispatch(exitWatchedStock(id))}
    />
  );
};

export default PositionSidebarContainer;
