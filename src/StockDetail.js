import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { createPosition } from "./store/actions/positions";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getOneWatchedStock} from "./store/actions/current-watched-stock";
import { createWatchedStock } from "./store/actions/watched-stocks";
import leaf from "./leaf-clipart-12-transparent.png";

import CountUp from 'react-countup';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';





const StockDetail = ({createWatchedStock, createPosition, watchedStocks}) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);
  const [stockName, setstockName] = useState("");
  const [shares, setshares] = useState("");
  const [livedescription, setCompanyDescription] = useState('');
  const [liveimage, setImage] = useState('');
  const [liveexchange, setExchange] = useState('');
  const [screen, setScreen] = useState('1week')
  const [timeIndex, setTimeIndex] =useState (70)
  const [success, setSuccess] = useState('')
  const [storiesLoading, setStoriesLoading] = useState(true)


  

  const { stockSymbol } = useParams();

  



  //financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    if (!stockSymbol) {
      return;
    }
    const fetchCompanyInfo = async () =>{
      const API_Key = process.env.REACT_APP_FMP_API_KEY;
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
  }, [stockSymbol]);
  useEffect(() => {
    if (!stockSymbol) {
      return;
    }
    const fetchPositionNews = async () =>{
       const API_Key = process.env.REACT_APP_FMP_API_KEY;
       
  
  let API_CALL = `https://financialmodelingprep.com/api/v3/stock_news?tickers=${stockSymbol}&limit=10&apikey=${API_Key}`;
  
  
  fetch(API_CALL)
  .then(
      function(response){
          return response.json()
      }
  )
  .then(
      function(data){
        setStories(data)
        setStoriesLoading(false)
          
      }
  )
  }
    fetchPositionNews();  
  }, [stockSymbol]); 
 //alphavantage stock fetch -------------------------------------------------------------
 useEffect(() => {
  if (!stockSymbol) {
    return;
  }
  const fetchLivePositions = async () =>{
    setIsLoading(true); 

    const API_Key = process.env.REACT_APP_FMP_API_KEY;
      
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
          
              for(let key in data){
                  stockChartXValuesFunction.push(data[key]['date']);
                  stockChartYValuesFunction.push(data[key]['open']);
              }
              
              setTimeout(function(){ setIsLoading(false); }, 250);
              setstockChartXValues(stockChartXValuesFunction)
              setstockChartYValues(stockChartYValuesFunction)
              
          }
      )
        }
    fetchLivePositions();
  

}, [stockSymbol]);

  if (!stockSymbol) {
    return null;
  }

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


  const lineChartData = {
    
    labels: stockChartXValues.slice(0, timeIndex),
    datasets: [
      {
        label: stockSymbol,
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

  const upOrDown = stockChartYValues[0] > stockChartYValues[timeIndex] ? 'background' : 'background2'
  const upOrDown2 = stockChartYValues[0] > stockChartYValues[timeIndex] ? "primary" : "secondary"

  const loading = () => {
    if (storiesLoading) {
    return (
    <>
    
    <main className="centered middled">
      <b>Fetching market data...</b>
      <CircularProgress />
      </main>
    </>
    )
  }
}

// console.log(watchedStocks)
return (
    <div className="position-detail">

    <div className={`position-detail-image-${upOrDown}`}>
        
        <div className='header-element'>
          <div className='company-logo'>
        <img src={liveimage} alt="Company Logo" />
        </div>
        <div className='company-titles'>
        <h1 className="bigger">{stockSymbol}</h1>
        <h1 className="bigger">{stockName}</h1>
        <h1 className="bigger">
        $<CountUp start={0} decimals={2} end={parseFloat(stockChartYValues[0]).toFixed(2)} duration={1.00} separator="," />

        </h1>
        </div>
        </div>
      </div>
      <div className="position-detail-lists">
      
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
                                setScreen('1month')
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
        { isNaN(parseFloat(stockChartYValues[0]).toFixed(2)) ? <Alert severity="error">Failed to fetch current price. Try again later.</Alert> :
        <Button variant="contained" color={upOrDown2}  type="submit">Buy Shares!</Button>}

        <div className='exit-position'>
        { isNaN(parseFloat(stockChartYValues[0]).toFixed(2)) ? <Alert severity="error">Failed to fetch current price. Try again later.</Alert> :
        <Button variant="contained" color={upOrDown2}  onClick={handleClick} >Add to Watchlist</Button>}
      
        </div>

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
          {loading}
        
        <div> 
          {stories.length === 0 ? <Alert severity="error">You have exceeded the amount of free news fetches, try again later.</Alert> :
          stories.map(story => {
            return (
              <div className='newsContainer' key={story.timestamp}>
                  <div className='newsTitle'>
                    
                    <a className='newsLink' href={story.url}>{story.title}</a>
                    <div>{story.symbol}</div>
                    <div>{story.publishedDate}</div>
                  </div>
                  <div className='newsSummary'>
                    
                    <div>{story.text}</div>
                
                  </div>
                  <img height='100%' width='100%' src={story.image ? story.image : leaf} alt='news'></img>
               </div>
            )
          })}
          </div>
          </div>

    </div>
  );
};
  
  const WatchedStockDetailContainer = () => {
    const positions = useSelector((state) => state.positions[state.currentPosition]);
    const dispatch = useDispatch();
    const watchedStocks = useSelector((state) => state.watchedStocks[state.currentWatchedStock]);
  
    return (
  
      <StockDetail
      watchedStocks ={watchedStocks}
      positions = {positions}
      getOneWatchedStock={(id) => dispatch(getOneWatchedStock(id))}
      createPosition={(positions) => dispatch(createPosition(positions))}
      createWatchedStock={(watchedStocks) => dispatch(createWatchedStock(watchedStocks))}

      />
    
    );
  };
  
  export default WatchedStockDetailContainer;