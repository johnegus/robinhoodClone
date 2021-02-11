import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import polygonApi from './util/polygon';
import { Line } from 'react-chartjs-2';
import { createPosition } from "./store/actions/positions";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getOneWatchedStock} from "./store/actions/current-watched-stock";
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';





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
  const [screen, setScreen] = useState('1week')
  const [timeIndex, setTimeIndex] =useState (70)
  const [monthChart, setMonthChart] = useState('30min')
  const [success, setSuccess] = useState('')

  

  const { id } = useParams();

  

  useEffect(() => {
    getOneWatchedStock(id);
  }, [id]);

  //financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    if (!watchedStocks) {
      return;
    }
    const fetchCompanyInfo = async () =>{
      const API_Key = process.env.REACT_APP_FMP_API_KEY;
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
    
    const API_Key = process.env.REACT_APP_FMP_API_KEY;
      let stockSymbol = watchedStocks.stockSymbol
      let API_CALL = `https://financialmodelingprep.com/api/v3/historical-chart/30min/${stockSymbol}?apikey=${API_Key}`;
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
                  stockChartXValuesFunction.push(data[key]['date']);
                  stockChartYValuesFunction.push(data[key]['open']);
              }
              
              setIsLoading(false);
              setstockChartXValues(stockChartXValuesFunction)
              setstockChartYValues(stockChartYValuesFunction)
              setcurrentPrice(watchedStocks.currentPrice)
              setbuyPrice(watchedStocks.currentPrice)
              
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
  console.log(stockChartXValues)

  // const timeIndex = (screen) => {
  //   if (screen === '1day'){
  //     return 79
  //   }

  //   if (screen === '1week'){
  //     return 399
  //   }
  // }
  const lineChartData = {
    
    labels: stockChartXValues.slice(0, timeIndex),
    datasets: [
      {
        label: watchedStocks.stockSymbol,
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
    const currentPrice = watchedStocks.currentPrice
  
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

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const upOrDown = stockChartYValues[0] > stockChartYValues[timeIndex] ? 'background' : 'background2'
  const upOrDown2 = stockChartYValues[0] > stockChartYValues[timeIndex] ? "primary" : "secondary"

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
        <h1 className="bigger">
        $<CountUp start={0} decimals={2} end={watchedStocks.currentPrice} duration={1.00} separator="," />

        </h1>
        </div>
        </div>
      </div>
      <div className="pokemon-detail-lists">
      
        <div className='stock-chart'>
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
                                console.log(stockChartXValues)
                                setScreen('1month')
                                setMonthChart('30min')
                                setTimeIndex(199)
                              }}>1 month</Button>
          </div>
        </div>
        <div className='your-position'>
          
            <h2>Buy</h2>
            <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Shares"
          required
          value={shares}
          onChange={updateProperty(setshares)}
        />
        { isNaN(currentPrice) ? 'Failed to fetch current price. Try again later.' :
        <Button variant="contained" color={upOrDown2}  type="submit">Buy Shares!</Button>}
        {success ?
         <Alert className='fade-out' severity="success">{success}</Alert> :
         ''
         }
        
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
              <b>Current Price</b> ${watchedStocks.currentPrice}
            </li>
            <li>
              <b>Exchange</b> {liveexchange}
            </li>
            <li>
              <b>Company Description</b> {livedescription}
            </li>
            
            
          </ul>
          <h2>News</h2>

          {stories.length === 0 ? 'You have exceeded the amount of free news fetchs, try again later.' :
          stories.map(story => {
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