import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from './SearchContext';

import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2';
import { createPosition } from "../store/actions/positions";
import { createWatchedStock } from "../store/actions/watched-stocks";
import { hideForm } from "../store/actions/ui";
import Alert from '@material-ui/lab/Alert';
import { NavLink } from 'react-router-dom';
import leaf from "../leaf-clipart-12-transparent.png";








const SearchDetail = ({createPosition, createWatchedStock}) => {
   const context = useContext(SearchContext);
   const [isLoading, setIsLoading] = useState(true); 
   const [stockChartXValues, setstockChartXValues] = useState([]);
   const [stockChartYValues, setstockChartYValues] = useState([]);
   const [stockSymbol, setstockSymbol] = useState("");
   const [stockName, setstockName] = useState("");
   const [shares, setshares] = useState("");
   const [liveexchange, setExchange] = useState('');
   const [screen, setScreen] = useState('1week')
   const [timeIndex, setTimeIndex] =useState (70)
   const [success, setSuccess] = useState('')


    const handleSubmit = (e) => {
      e.preventDefault();
      let currentPrice = parseFloat(stockChartYValues[0]).toFixed(2)
      let buyPrice = parseFloat(stockChartYValues[0]).toFixed(2)
      const payload = {
        stockSymbol,
        stockName,
        currentPrice,
        buyPrice,
        shares,
        
      };
      createPosition(payload);
      setSuccess(`${shares} shares of ${stockName} bought at ${buyPrice}.`)
        setTimeout(function()
           {
            setSuccess('')
           },8000);
    };

    const handleClick= (e) =>{    
      e.preventDefault(); 
      let currentPrice = parseFloat(stockChartYValues[0]).toFixed(2)   
      const payload = {
        stockSymbol,
        stockName,
        currentPrice,
        
      };
      createWatchedStock(payload);
      setSuccess(`${stockName} has been added to your watchlist.`)
        setTimeout(function()
           {
            setSuccess('')
           },8000);
    
    }


    
    const updateProperty = (callback) => (e) => {
      callback(e.target.value);
    };
     //financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    if (!context.searchQuery) {
      return;
    }
    const fetchCompanyInfo = async () =>{
      const API_Key = process.env.REACT_APP_FMP_API_KEY;
      let stockSymbol = context.searchQuery
      let API_CALL = `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${API_Key}`;
     
    
      fetch(API_CALL)
      .then(
          function(response){
              return response.json()
          }
      )
      .then(
          function(data){
           
            setstockName(data[0]['companyName'])
            setstockSymbol(stockSymbol)
            setExchange(data[0]['exchangeShortName'])
              
          }
      ).catch(error => 
        setstockSymbol('INVALID SYMBOL')
      )
    }
    fetchCompanyInfo();  
    //setinterval would go here return the clear interval
    //return ()=> clearInterval
  }, [context.searchQuery]);
   //alphavantage stock fetch -------------------------------------------------------------
   useEffect(() => {
    if (!context.searchQuery) {
      return;
    }
    const fetchLivePositions = async () =>{
      
      const API_Key = process.env.REACT_APP_FMP_API_KEY;
      let stockSymbol = context.searchQuery
      let API_CALL = `https://financialmodelingprep.com/api/v3/historical-chart/30min/${stockSymbol}?apikey=${API_Key}`;
      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];
      
      
        fetch(API_CALL)
        .then(
            function(response){
                return response.json()
            }
        ).catch(error =>  
          setstockSymbol('INVALID SYMBOL')
        )
        .then(
           function(data){
            
    
                for(let key in data){
                    stockChartXValuesFunction.push(data[key]['date']);
                    stockChartYValuesFunction.push(data[key]['open']);
                }
               
                
                setTimeout(function(){ setIsLoading(false); }, 250);

                setstockChartXValues(stockChartXValuesFunction)
                setstockChartYValues(stockChartYValuesFunction)
               
            }
            
        );
          }
      fetchLivePositions();
      
    
  
  }, [context.searchQuery, stockChartYValues]);
  
    if (!context.searchQuery) {
      return null;
    }
    const loading = () => {
    if (isLoading) {
      return (
      <>
      
      <main className="centered middled">
        <b>Fetching market data...</b>
        <img className='icon-progress' height='200px' width='200px' src={leaf} alt='leaf' />
      </main>
      </>
      )
    }
  }
  
    const lineChartData = {
      labels: stockChartXValues.slice(0, timeIndex),
      datasets: [
        {
          label: context.searchQuery,
          data: stockChartYValues.slice(0, timeIndex),
          fill: false,
          backgroundColor:stockChartYValues[0] > stockChartYValues[timeIndex] ? 'green' : 'red',
          // borderColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: stockChartYValues[0] > stockChartYValues[timeIndex] ? 'green' : 'red',
          borderWidth: 4
        },
      ],
    }
    
    const options = {
      elements: {
        point:{
            radius: 0
        }
    },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
        xAxes: [{
          display: false,
          ticks: {
            reverse: true,
          }
      }]
      },
    }
    const upOrDown2 = stockChartYValues[0] > stockChartYValues[timeIndex] ? "primary" : "secondary"

  return (
      <div className="position-detail">
  
        
          <Line data={lineChartData} options={options} />
          <div className='button-container'> 
              <Button variant={screen==='1day' ? 'contained':"outlined"} color={upOrDown2} 
                              onClick={async ()=> {
                                setScreen('1day')
                                setTimeIndex(9)
                              }}>1 Day</Button>
              <Button variant={screen==='1week' ? 'contained':"outlined"}  color={upOrDown2} 
                              onClick={async ()=> {
                                setScreen('1week')
                                setTimeIndex(70)
                              }}>1 week</Button>
              <Button variant={screen==='1month' ? 'contained':"outlined"}  color={upOrDown2} 
                              onClick={async ()=> {
                                setScreen('1month')
                                setTimeIndex(199)
                              }}>1 month</Button>
          </div>
          {stockSymbol !== 'INVALID SYMBOL' ? 
        <div className="position-detail-lists">
          <div>
            <h4>Stock Information</h4>
            <ul>
            <li>
              <b>Symbol</b> <NavLink to={`/stock/${stockSymbol}`}>
                
              {stockSymbol}
                </NavLink>
            </li>
            <li>
              <b>Stock Name</b> <NavLink to={`/stock/${stockSymbol}`}>
                
              {stockName}
                  </NavLink>
            </li>
            <li>
              <b>Current Price</b> ${parseFloat(stockChartYValues[0]).toFixed(2)}
            </li>
            <li>
              <b>Exchange</b> {liveexchange}
            </li>
          </ul>
          </div>
            <form onSubmit={handleSubmit}>
        <input
          className='search-input'
          type="number"
          min="1"
          placeholder="Shares"
          required
          value={shares}
          onChange={updateProperty(setshares)}
        />
        { isNaN(parseFloat(stockChartYValues[0]).toFixed(2)) ? <Alert severity="error">Failed to fetch current price. Try again later.</Alert>:
        <Button variant="contained" color={upOrDown2}  type="submit">Buy Shares!</Button>}
        <div className='exit-position'>
        <Button variant="contained" color={upOrDown2}  onClick={handleClick} >Add to Watchlist</Button>
        </div>
      
      </form>
        </div>
        
        :
        <div className="centered middled">
          <Alert severity="error">Invalid symbol. Try again.</Alert>
          </div>
        }  
    {success ?
         <Alert className='fade-out' severity="success">{success}</Alert> :
         ''
         }
      </div>
    );
  };
  
  const SearchDetailContainer = () => {
    const dispatch = useDispatch();
  
    return (
  
      <SearchDetail
      createPosition={(positions) => dispatch(createPosition(positions))}
      createWatchedStock={(watchedStocks) => dispatch(createWatchedStock(watchedStocks))}
      hideForm={() => dispatch(hideForm())}
      />
    
    );
  };
  
  export default SearchDetailContainer;