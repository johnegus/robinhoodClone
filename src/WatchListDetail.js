import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import polygonApi from './util/polygon';
import { Line } from 'react-chartjs-2';
import { createPosition } from "./store/actions/positions";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getOneWatchedStock} from "./store/actions/current-watched-stock";




const WatchListDetail = ({watchedStocks, getOneWatchedStock, createPosition}) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);
  const [stockSymbol, setstockSymbol] = useState("");
  const [stockName, setstockName] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");
  const [buyPrice, setbuyPrice] = useState("");
  const [shares, setshares] = useState("");
  const [livedescription, setCompanyDescription] = useState('');
  const [liveimage, setImage] = useState('');
  const [liveexchange, setExchange] = useState('');

  // setstockName(data[0][companyName])
  //           setCompanyDescription(data[0][description])
  //           setExchange(data[0][exchangeShortName])
  //           setImage(data[0][image])

  

  const { id } = useParams();
 

  // useEffect(() => {
  //   createInstance(id);
  // }, [id]);
  

  useEffect(() => {
    getOneWatchedStock(id);
  }, [id]);

  //financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    if (!watchedStocks) {
      return;
    }
    const fetchCompanyInfo = async () =>{
      const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
      let stockSymbol = watchedStocks.stockSymbol
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
            setCompanyDescription(data[0]['description'])
            setExchange(data[0]['exchangeShortName'])
            setImage(data[0]['image'])
              
          }
      )
    }
    fetchCompanyInfo();  
    //setinterval would go here return the clear interval
    //return ()=> clearInterval
  }, [watchedStocks]);
  //polygon news fetch -------------------------------------------------------------
  useEffect(() => {
    if (!watchedStocks) {
      return;
    }
    const fetchPositionNews = async () =>{
      const polygon = polygonApi()
      polygon.getQuote(watchedStocks.stockSymbol).then((response) => {
      
        if(response.ok){
          setStories(response.data)
        }
      });
    }
    fetchPositionNews();  
    //setinterval would go here return the clear interval
    //return ()=> clearInterval
  }, [watchedStocks]);
 //alphavantage stock fetch -------------------------------------------------------------
 useEffect(() => {
  if (!watchedStocks) {
    return;
  }
  const fetchLivePositions = async () =>{
    
    const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
      let stockSymbol = watchedStocks.stockSymbol
      let API_CALL = `https://financialmodelingprep.com/api/v3/historical-chart/5min/${stockSymbol}?apikey=${API_Key}`;
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
            // console.log('FMP Historical data Search')
            //   console.log(data)
              // setVolume(data['Time Series (5min)'][0]["5. volume"]);
              setstockSymbol(watchedStocks.stockSymbol);
              for(let key in data){
                  stockChartXValuesFunction.push(key);
                  stockChartYValuesFunction.push(data[key]['open']);
              }
              setIsLoading(false);
              
              setstockChartXValues(stockChartXValuesFunction)
              setstockChartYValues(stockChartYValuesFunction)
              setcurrentPrice(parseFloat(stockChartYValues[0]).toFixed(2))
              setbuyPrice(parseFloat(stockChartYValues[0]).toFixed(2))
            
          }
      )
        }
    fetchLivePositions();
  

}, [watchedStocks]);

  if (!watchedStocks) {
    return null;
  }

  if (isLoading) {
    return (
    <>
    
    <main className="centered middled">
      <b>Fetching market data...</b>
      <CircularProgress />
      </main>
    </>
    )
  }
  const lineChartData = {
    labels: stockChartXValues,
    datasets: [
      {
        label: watchedStocks.stockSymbol,
        data: stockChartYValues,
        fill: false,
        backgroundColor:stockChartYValues[0] > stockChartYValues[99] ? 'green' : 'red',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: stockChartYValues[0] > stockChartYValues[99] ? 'green' : 'red'
      },
    ],
  }
  
  const options = {
    legend: {
      display: true,
    },
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
 
  const handleSubmit = (e) => {
    e.preventDefault();

  
    const payload = {
      stockSymbol,
      stockName,
      currentPrice,
      buyPrice,
      shares,
      
    };
    createPosition(payload);
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const upOrDown = stockChartYValues[0] > stockChartYValues[99] ? 'background' : 'background2'
return (
    <div className="pokemon-detail">

    <div className={`pokemon-detail-image-${upOrDown}`}>
        
        <div className='header-element'>
          <div className='company-logo'>
        <img src={liveimage} alt="Company Logo" />
        </div>
        <div className='company-titles'>
        <h1 className="bigger">{watchedStocks.stockSymbol}</h1>
        <h1 className="bigger">{stockName}</h1>
        <h1 className="bigger">${parseFloat(stockChartYValues[0]).toFixed(2)}</h1>
        </div>
        </div>
      </div>
      <div className="pokemon-detail-lists">
      
        <div>
        <Line data={lineChartData} options={options} />
          
        </div>
        <div>
          
            <h2>Buy</h2>
            <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Shares"
          required
          value={shares}
          onChange={updateProperty(setshares)}
        />
        { isNaN(currentPrice) ? 'Failed to fetch current price' :
        <button type="submit">Buy Shares!</button>}
        
      </form>
              
    
        </div>
      </div>
      <div className='newsFeed'>
      <h2>Stock Information</h2>
          <ul>
            <li>
              <b>Symbol</b> {stockSymbol}
            </li>
            <li>
              <b>Stock Name</b> {stockName}
            </li>
            <li>
              <b>Current Price</b> ${parseFloat(stockChartYValues[0]).toFixed(2)}
            </li>
            <li>
              <b>Exchange</b> {liveexchange}
            </li>
            <li>
              <b>Company Description</b> {livedescription}
            </li>
            
            
          </ul>
          <h2>News</h2>
          {stories.map(story => {
              return (
                <div className='newsContainer' key={story.timestamp}>
                    <div className='newsTitle'>
                      
                      <a className='newsLink' alt='news' href={story.url}>{story.title}</a>
                    </div>
                    <div className='newsSummary'>
                    {story.summary}
                    </div>
                     <img height='100%' width='100%' src={story.image}></img>
                 </div>
              )
            })}
          </div>

    </div>
  );
};
  
  const WatchedStockDetailContainer = () => {
    const positions = useSelector((state) => state.positions[state.currentPosition]);
    const dispatch = useDispatch();
    const watchedStocks = useSelector((state) => state.watchedStocks[state.currentWatchedStock]);
  
    return (
  
      <WatchListDetail
      watchedStocks ={watchedStocks}
      positions = {positions}
      getOneWatchedStock={(id) => dispatch(getOneWatchedStock(id))}
      createPosition={(positions) => dispatch(createPosition(positions))}
      />
    
    );
  };
  
  export default WatchedStockDetailContainer;