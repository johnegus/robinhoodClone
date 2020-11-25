import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import PositionDetail from "./PositionDetail";
import PositionForm from "./PositionForm";

import { showForm } from "./store/actions/ui";
import { getPositions } from "./store/actions/positions";
import {getWatchedStocks} from './store/actions/watched-stocks'
import {getHistoricalData} from './store/actions/history'
import UserDetail from './UserDetail';
import WatchListDetail from './WatchListDetail';
import { exitWatchedStock } from './store/actions/watched-stocks'


import SearchContainer from "./search/SearchContainer";

const PositionSidebar = ({ positions, getPositions, getWatchedStocks, 
  getHistoricalData, formVisible, showForm, watchedStocks }) => {
  const dispatch = useDispatch();
  const [currentPrices, setcurrentPrices] = useState([]);

  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    getWatchedStocks();
  }, []);
  useEffect(() => {
    getHistoricalData();
  }, []);

  // fetching latest quote for each stock   
//   useEffect(() => {                                    
//   const fetchCurrentPrices = () =>{
//     const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
//     let stockChartYValuesFunction;
    
//     const fetchedPrices = positions.map(position => { 
//       let stockSymbol = position.stockSymbol
//       let API_CALL = `https://financialmodelingprep.com/api/v3/quote/${stockSymbol}?apikey=${API_Key}`;


      
//         return fetch(API_CALL)
//         .then(
//             function(response){
//                 return response.json()
//             }
//         )
//         .then(
//             function(data){
//               console.log('fetch  data from FMP')
//               console.log(data)
  
          
              
//                 stockChartYValuesFunction= (data[0]['price']);
//                 console.log(stockChartYValuesFunction)
                         
                 
//             }
//         )   
// })
// setcurrentPrices(fetchedPrices)
// console.log(currentPrices);
// }
// fetchCurrentPrices()
// // setInterval(fetchCurrentPrices(), 60000);
// }, [positions]);

  

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
                <div className='randomizer'
                  >price</div>
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
                <div className='randomizer'
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
      {formVisible ? (
        <PositionForm />
      ) : (
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
      )}
    </main>
  );
};

const PositionSidebarContainer = () => {
  const formVisible = useSelector((state) => state.ui.formVisible);
  const positions = useSelector((state) => Object.values(state.positions));
  const watchedStocks = useSelector((state) => Object.values(state.watchedStocks));
  const history = useSelector((state) => Object.values(state.history));
  const dispatch = useDispatch();
  return (
    <PositionSidebar
      positions={positions}
      watchedStocks={watchedStocks}
      history={history}
      formVisible={formVisible}
      getWatchedStocks={() => dispatch(getWatchedStocks())}
      getPositions={() => dispatch(getPositions())}
      getHistoricalData={() => dispatch(getHistoricalData())}
      showForm={() => dispatch(showForm())}
      exitWatchedStock={(id) => dispatch(exitWatchedStock(id))}
    />
  );
};

export default PositionSidebarContainer;
