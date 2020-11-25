import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import polygonApi from './util/polygon';
import { Line } from 'react-chartjs-2';
import { exitPosition } from "./store/actions/positions";
import { createPosition } from "./store/actions/positions";
import { createInstance } from "./store/actions/history";
import CircularProgress from '@material-ui/core/CircularProgress';



import { getOnePosition } from "./store/actions/current-position";

const PositionDetail = ({ positions, getOnePosition, createPosition, createInstance }) => {
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
  const [soldPrice, setSoldPrice] = useState('');



  

  const dispatch = useDispatch();
  const { id } = useParams();
  

  useEffect(() => {
    getOnePosition(id);
  }, [id]);

  //financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    if (!positions) {
      return;
    }
    const fetchCompanyInfo = async () =>{
      const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
      let stockSymbol = positions.stockSymbol
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
  }, [positions]);
  //polygon news fetch -------------------------------------------------------------
  useEffect(() => {
    if (!positions) {
      return;
    }
    const fetchPositionNews = async () =>{
      const polygon = polygonApi()
      polygon.getQuote(positions.stockSymbol).then((response) => {
      
      
        if(response.ok){
          setStories(response.data)
        }
      });
    }
    fetchPositionNews();  
    //setinterval would go here return the clear interval
    //return ()=> clearInterval
  }, [positions]);
 //alphavantage stock fetch -------------------------------------------------------------
 useEffect(() => {
  if (!positions) {
    return;
  }
  const fetchLivePositions = async () =>{
    
    const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
    let stockSymbol = positions.stockSymbol
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
            console.log('FMP Historical data Position')
              console.log(data)
              // setVolume(data['Time Series (5min)'][0]["5. volume"]);
              setstockSymbol(positions.stockSymbol);
              for(let key in data){
                  stockChartXValuesFunction.push(key);
                  stockChartYValuesFunction.push(data[key]['open']);
              }
              setIsLoading(false);

              setstockChartXValues(stockChartXValuesFunction)
              setstockChartYValues(stockChartYValuesFunction)
              setcurrentPrice(parseFloat(stockChartYValues[0]).toFixed(2))
              setSoldPrice(parseFloat(stockChartYValues[0]).toFixed(2))
          }
      )
        }
    fetchLivePositions();
  

}, [positions]);

//   // fetching latest quote for each stock   
//   useEffect(() => {    
//     if (!positions) {
//       return;
//     }                                
//   const fetchCompanyInfo = async () =>{

//     const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
//     let stockSymbol = positions.stockSymbol
//     let API_CALL = `https://financialmodelingprep.com/api/v3/quote/${stockSymbol}?apikey=${API_Key}`;
//     let stockChartXValuesFunction;
//     let stockChartYValuesFunction;
      
//         fetch(API_CALL)
//         .then(
//             function(response){
//                 return response.json()
//             }
//         )
//         .then(
//             function(data){
//               console.log('fetch  data from FMP')
//               console.log(data);
  
//               for(let key in data){
//                 stockChartXValuesFunction= key;
//                 stockChartYValuesFunction= (data[key]['price']);
//               }
//                  console.log(stockChartYValuesFunction);
//                  setcurrentPrice(parseFloat(stockChartYValuesFunction).toFixed(2))
//                  setSoldPrice(parseFloat(stockChartYValuesFunction).toFixed(2))

                 
//             }
//         )
        
// }
// fetchCompanyInfo()
// // setTimeout(fetchCompanyInfo(), 50000);
// }, [positions]);

  if (!positions) {
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
        label: positions.stockSymbol,
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
    setbuyPrice(parseFloat(stockChartYValues[0]).toFixed(2))

   
    const payload = {
      stockSymbol,
      stockName,
      currentPrice,
      buyPrice,
      shares,
      
    };
    createPosition(payload);
  };

  const handleClick = async (e) => {
    console.log('symbol: ' + stockSymbol)
    console.log('company: ' + stockName)
    console.log('sellprice: ' + soldPrice)
    const boughtPrice = positions.buyPrice
    console.log('boughtprice: ' + boughtPrice)
    const shares = positions.shares
    console.log('shares: ' + shares)
    
    const payload ={
    stockSymbol,
    stockName,
    soldPrice,
    boughtPrice,
    shares
    };
    createInstance(payload);
    dispatch(exitPosition(positions.id));

    
    
  }

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
        <h1 className="bigger">{positions.stockSymbol}</h1>
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
                <b>Market Value:</b> ${(positions.shares*currentPrice).toFixed(2)}
              </li>
              <li>
                <b>Total Return:</b> ${(positions.shares*currentPrice-positions.shares*positions.buyPrice).toFixed(2)}
              </li>
            </ul>
            <h2>Buy More</h2>
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
        { isNaN(currentPrice) ? 'Failed to fetch current price' :
            <button onClick={handleClick} >Exit Position</button>}
            
    
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
                      
                      <a className='newsLink' href={story.url}>{story.title}</a>
                    </div>
                    <div className='newsSummary'>
                    {story.summary}
                    </div>
                     <img height='100%' width='100%' src={story.image} alt='news'></img>
                 </div>
              )
            })}
          </div>
    </div>
  );
};

const PositionDetailContainer = () => {
  const positions = useSelector((state) => state.positions[state.currentPosition]);
  const history = useSelector((state) => Object.values(state.history));
  const dispatch = useDispatch();

  return (

    <PositionDetail
    positions={positions}
    history = {history}
      getOnePosition={(id) => dispatch(getOnePosition(id))}
      exitPosition={(id) => dispatch(exitPosition(id))}
      createPosition={(positions) => dispatch(createPosition(positions))}
      createInstance={(history) => dispatch(createInstance(history))}
    />
  
  );
};

export default PositionDetailContainer;
