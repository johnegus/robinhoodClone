import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from './SearchContext';

import { useSelector, useDispatch } from "react-redux";

import { Line } from 'react-chartjs-2';
import { createPosition } from "../store/actions/positions";
import { createWatchedStock } from "../store/actions/watched-stocks";
import { hideForm } from "../store/actions/ui";
import CircularProgress from '@material-ui/core/CircularProgress';




const SearchDetail = ({positions, getOnePosition, createPosition, createWatchedStock}) => {
   const context = useContext(SearchContext);
   const [isLoading, setIsLoading] = useState(true); 
   const [stockChartXValues, setstockChartXValues] = useState([]);
   const [stockChartYValues, setstockChartYValues] = useState([]);
   const [stockSymbol, setstockSymbol] = useState("");
   const [stockName, setstockName] = useState("");
   const [currentPrice, setcurrentPrice] = useState("");
   const [buyPrice, setbuyPrice] = useState("");
   const [shares, setshares] = useState("");
   const [liveexchange, setExchange] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(stockSymbol)
    console.log(stockName)
    console.log(currentPrice)
    console.log(buyPrice)
    console.log(shares)
      const payload = {
        stockSymbol,
        stockName,
        currentPrice,
        buyPrice,
        shares,
        
      };
      createPosition(payload);
    };

    const handleClick= (e) =>{    
      e.preventDefault();    
      const payload = {
        stockSymbol,
        stockName,
        currentPrice,
        
      };
      createWatchedStock(payload);
    
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
      const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
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
            console.log('fetch ticker data from FMP')
            console.log(data);
            setstockName(data[0]['companyName'])
            setstockSymbol(stockSymbol)
            setExchange(data[0]['exchangeShortName'])
              
          }
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
      
        const API_Key = '06N03QCM2TDKP6QS';
        let stockSymbol = context.searchQuery
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${API_Key}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
      
      
        fetch(API_CALL)
        .then(
            function(response){
                return response.json()
            }
        )
        .then(
            function(data){
              console.log('fetch ticker data from alphavantage')
                console.log(data);
                for(let key in data['Time Series (5min)']){
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (5min)'][key]['1. open']);
                }
                console.log(stockChartXValuesFunction);
                console.log(stockChartYValuesFunction);
                setstockChartXValues(stockChartXValuesFunction)
                setstockChartYValues(stockChartYValuesFunction)
                setcurrentPrice(parseInt(stockChartYValues[0]))
                setbuyPrice(parseInt(stockChartYValues[0]))
                setIsLoading(false);
            }
        )
          }
      fetchLivePositions();
    
  
  }, [context.searchQuery]);
  
    if (!context.searchQuery) {
      return null;
    }
  
    const lineChartData = {
      labels: stockChartXValues,
      datasets: [
        {
          label: context.searchQuery,
          data: stockChartYValues,
          fill: false,
          backgroundColor:stockChartYValues[0] > stockChartYValues[99] ? 'green' : 'red',
          // borderColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: stockChartYValues[0] > stockChartYValues[99] ? 'green' : 'red'
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
   
  return (
      <div className="pokemon-detail">
        
        
          <Line data={lineChartData} options={options} />
        <div className="pokemon-detail-lists">
          <div>
            <h4>Stock Information</h4>
            <ul>
            <li>
              <b>Symbol</b> {stockSymbol}
            </li>
            <li>
              <b>Stock Name</b> {stockName}
            </li>
            <li>
              <b>Current Price</b> ${parseInt(stockChartYValues[0]).toFixed(2)}
            </li>
            <li>
              <b>Exchange</b> {liveexchange}
            </li>
            {/* <li>
              <b>Company Description</b> {livedescription}
            </li> */}
            
            
          </ul>
          </div>
            <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Shares"
          required
          value={shares}
          onChange={updateProperty(setshares)}
        />
        <button type="submit">Buy Shares!</button>
        <button onClick={handleClick} >Add to Watchlist</button>
      </form>
        </div>
        {/* <div className='newsFeed'>
            {stories.map(story => {
                return (
                  <div className='newsContainer' key={story.timestamp}>
                      <div className='newsTitle'>
                        
                        <a className='newsLink' target="_blank" href={story.url}>{story.title}</a>
                      </div>
                      <div className='newsSummary'>
                      {story.summary}
                      </div>
                       <img height='100%' width='100%' src={story.image}></img>
                   </div>
                )
              })}
            </div> */}
      </div>
    );
  };
  
  const SearchDetailContainer = () => {
    const positions = useSelector((state) => state.positions[state.currentPosition]);
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