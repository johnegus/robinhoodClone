import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { exitPosition } from "./store/actions/positions";
import { createPosition } from "./store/actions/positions";
import { createInstance } from "./store/actions/ledger";
import CircularProgress from '@material-ui/core/CircularProgress';
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import leaf from "./leaf-clipart-12-transparent.png";





import { getOnePosition } from "./store/actions/current-position";

const PositionDetail = ({ positions, getOnePosition, createPosition, createInstance }) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);
  const [stockSymbol, setstockSymbol] = useState("");
  const [stockName, setstockName] = useState("");
  const [shares, setshares] = useState("");
  const [livedescription, setCompanyDescription] = useState('');
  const [liveimage, setImage] = useState('');
  const [liveexchange, setExchange] = useState('');
  const [soldPrice, setSoldPrice] = useState('');
  const [screen, setScreen] = useState('1week')
  const [timeIndex, setTimeIndex] =useState (70)
  const [success, setSuccess] = useState('')
  const [storiesLoading, setStoriesLoading] = useState(true)

  

  const dispatch = useDispatch();
  const { id } = useParams();
  const prevId = useState(null)
  

  useEffect(() => {

    if(prevId[0]!==id){
      getOnePosition(id);
      prevId[1](id)
    }
  }, [id,getOnePosition,prevId]);

// financial modeling prep news fetch ---------------------------------------------------------------------
useEffect(() => {
  if (!positions) {
    return;
  }
  const fetchPositionNews = async () =>{
     const API_Key = process.env.REACT_APP_FMP_API_KEY;
     let stockSymbol = positions.stockSymbol

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
}, [positions]); 
  //financial modeling prep stock info fetch---------------------------------------------------
  useEffect(() => {
    if (!positions) {
      return;
    }
    const fetchCompanyInfo = async () =>{
      const API_Key = process.env.REACT_APP_FMP_API_KEY;
      let stockSymbol1 = positions.stockSymbol
      let API_CALL = `https://financialmodelingprep.com/api/v3/profile/${stockSymbol1}?apikey=${API_Key}`;
     
    
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
  }, [positions]);
 
  //financial modeling prep ticker data fetch---------------------------------------------------
  useEffect(() => {
  if (!positions) {
    return;
  }
  const fetchLivePositions = async () =>{
    setIsLoading(true); 

    const API_Key = process.env.REACT_APP_FMP_API_KEY;
    let stockSymbol = positions.stockSymbol
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
           
              // setVolume(data['Time Series (5min)'][0]["5. volume"]);
              setstockSymbol(positions.stockSymbol);
              for(let key in data){
                  stockChartXValuesFunction.push(data[key]['date']);
                  stockChartYValuesFunction.push(data[key]['open']);
              }
              
              
              setstockChartXValues(stockChartXValuesFunction)
              setstockChartYValues(stockChartYValuesFunction)
              console.log(stockChartYValuesFunction)
              setSoldPrice(positions.currentPrice)
              setIsLoading(false); 
              
          }
      )
        }
    fetchLivePositions();
    

}, [positions]);

  


  if (!positions) {
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
        label: positions.stockSymbol,
        data: stockChartYValues.slice(0, timeIndex),
        fill: false,
        backgroundColor:stockChartYValues[0] > stockChartYValues[timeIndex] ? 'green' : 'red',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: stockChartYValues[0] > stockChartYValues[timeIndex] ? 'green' : 'red',
        borderWidth: 4,
        
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
    const buyPrice = positions.currentPrice
    const currentPrice = positions.currentPrice
   
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

  const handleClick = async (e) => {
    
    const boughtPrice = positions.buyPrice
    
    const shares = positions.shares
   
    
    const payload ={
    stockSymbol,
    stockName,
    soldPrice,
    boughtPrice,
    shares
    };
    createInstance(payload);
    setSuccess(`${shares} shares of ${stockName} sold at ${soldPrice}.`)
        setTimeout(function()
           {
            setSuccess('')
           },8000);
    dispatch(exitPosition(positions.id));
    
    
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
return (
    <div className="position-detail">
      <div className={`position-detail-image-${upOrDown}`}>
        
        <div className='header-element'>
          <div className='company-logo'>
        <img src={liveimage} alt="Company Logo" />
        </div>
        <div className='company-titles'>
        <h1 className="bigger">{positions.stockSymbol}</h1>
        <h1 className="bigger">{stockName}</h1>
        <h1 className="bigger">
        $<CountUp start={0} decimals={2} end={positions.currentPrice} duration={1.00} separator="," />
          </h1>
        </div>
        </div>
      </div>
      <div className="position-detail-lists">
      
        <div>
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
          <div>
          <h2>Your Position</h2>
            <ul>
              <li>
                <b>Shares:</b> {positions.shares}
              </li>
              <li>
                <b>Average Cost:</b> ${positions.buyPrice}
              </li>
              <li>
                <b>Date Purchased:</b> {positions.createdAt}
              </li>
              <li>
                <b>Market Value:</b> ${(positions.shares*positions.currentPrice).toFixed(2)}
              </li>
              <li>
                <b>Total Return:</b> ${(positions.shares*positions.currentPrice-positions.shares*positions.buyPrice).toFixed(2)}
              </li>
            </ul>
            
            <div className='buy-more'>
            <h2>Buy More</h2>
            <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          placeholder="Shares"
          required
          value={shares}
          onChange={updateProperty(setshares)}
        />
        { isNaN(positions.currentPrice) ? <Alert severity="error">Failed to fetch current price. Cannot buy. Try again later.</Alert>:
        
        <Button variant="contained" color={upOrDown2}  type="submit">Buy Shares!</Button>}
        
        </form>
        </div>
        <div className='exit-position'>
        { isNaN(positions.currentPrice) ? <Alert severity="error">Failed to fetch current price. Cannot sell. Try again later.</Alert> :
            <Button variant="contained" color={upOrDown2}  onClick={handleClick} >Exit Position</Button>}
         </div>   
         {success ?
         <Alert className='fade-out' severity="success">{success}</Alert> :
         ''
         }
         </div>
         </div>
      </div>
      <div className='newsFeed'>
        <div className='stock-information'>
      <h2>Stock Information</h2>
          <ul>
            <li>
              <b>Symbol</b> {stockSymbol}
            </li>
            <li>
              <b>Stock Name</b> {stockName}
            </li>
            <li>
              <b>Current Price</b> ${positions.currentPrice}
            </li>
            <li>
              <b>Exchange</b> {liveexchange}
            </li>
            <li>
              <b>Company Description</b> {livedescription}
            </li>            
          </ul>
          </div>
          
          <div>
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
    </div>
  );
};

const PositionDetailContainer = () => {
  const positions = useSelector((state) => state.positions[state.currentPosition]);
  const ledger = useSelector((state) => Object.values(state.ledger));
  const dispatch = useDispatch();

  return (

    <PositionDetail
    positions={positions}
    ledger = {ledger}
      getOnePosition={(id) => dispatch(getOnePosition(id))}
      exitPosition={(id) => dispatch(exitPosition(id))}
      createPosition={(positions) => dispatch(createPosition(positions))}
      createInstance={(ledger) => dispatch(createInstance(ledger))}
    />
  
  );
};

export default PositionDetailContainer;
