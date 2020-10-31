import React, { useEffect, useState, setState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import polygonApi from './util/polygon';
import { Line } from 'react-chartjs-2';
import { exitPosition } from "./store/actions/positions";
import { createPosition } from "./store/actions/positions";



import { getOnePosition } from "./store/actions/current-position";

const PositionDetail = ({ positions, getOnePosition, createPosition }) => {
  const [stories, setStories] = useState([]);
  const [livePositions, setLivePositions] = useState([])
  const [isLoading, setIsLoading] = useState(true); 
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);
  const [stockSymbol, setstockSymbol] = useState("");
  const [stockName, setstockName] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");
  const [buyPrice, setbuyPrice] = useState("");
  const [shares, setshares] = useState("");
 

  

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

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    exitPosition(id);
  }, [id]);

  

  useEffect(() => {
    getOnePosition(id);
  }, [id]);

  //polygon news fetch -------------------------------------------------------------
  useEffect(() => {
    if (!positions) {
      return;
    }
    const fetchPositionNews = async () =>{
      const polygon = polygonApi()
      polygon.getQuote(positions.stockSymbol).then((response) => {
        console.log('fetch data from polygon')
        console.log(response)
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
    
      const API_Key = '06N03QCM2TDKP6QS';
      let stockSymbol = positions.stockSymbol
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
    return <h1>Fetching stock data...</h1>;
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
      <div
        className={`pokemon-detail-image-background`}
        
      >
        <div className="pokemon-detail-image">
        <Line data={lineChartData} options={options} />
        </div>
        <div>
        <h1 className="bigger">{positions.stockSymbol}</h1>
        <h1 className="bigger">{positions.stockName}</h1>
        <h1 className="bigger">${parseInt(stockChartYValues[0]).toFixed(2)}</h1>
        </div>
      </div>
      <div className="pokemon-detail-lists">
        <div>
          <h2>Stock Information</h2>
          <ul>
            <li>
              <b>Symbol</b> {positions.stockSymbol}
            </li>
            <li>
              <b>Stock Name</b> {positions.stockName}
            </li>
            <li>
              <b>Current Price</b> ${parseInt(stockChartYValues[0]).toFixed(2)}
            </li>
            
          </ul>
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
                <b>Market Value:</b> ${positions.shares*parseInt(stockChartYValues[0]).toFixed(2)}
              </li>
              <li>
                <b>Total Return:</b> ${positions.shares*parseInt(stockChartYValues[0]).toFixed(2)-positions.shares*positions.buyPrice}
              </li>
            </ul>
            <form onSubmit={handleSubmit}>
        <input
          
          placeholder="Current Price"
          required
          value={parseInt(stockChartYValues[0]).toFixed(2)}
          onChange={updateProperty(setcurrentPrice)}
        />
        <input
          
          placeholder="Buy Price"
          required
          value={parseInt(stockChartYValues[0]).toFixed(2)}
          onChange={updateProperty(setbuyPrice)}
        />
        <input
          type="number"
          placeholder="Shares"
          required
          value={shares}
          onChange={updateProperty(setshares)}
        />
        <input
          type="text"
          placeholder="Stock Symbol"
          value={stockSymbol}
          onChange={updateProperty(setstockSymbol)}
        />
        <input
          type="text"
          placeholder="Stock Name"
          value={stockName}
          onChange={updateProperty(setstockName)}
        />
        <button type="submit">Buy Shares!</button>
        
      </form>
            <button onClick={()=> dispatch(exitPosition(positions.id))}>Exit Position</button>
        </div>
      </div>
      <div className='newsFeed'>
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
          </div>
    </div>
  );
};

const PositionDetailContainer = () => {
  const positions = useSelector((state) => state.positions[state.currentPosition]);
  const dispatch = useDispatch();

  return (

    <PositionDetail
    positions={positions}
      getOnePosition={(id) => dispatch(getOnePosition(id))}
      exitPosition={(id) => dispatch(exitPosition(id))}
      createPosition={(positions) => dispatch(createPosition(positions))}
    />
  
  );
};

export default PositionDetailContainer;
