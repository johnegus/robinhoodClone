import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from './SearchContext';

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import polygonApi from '../util/polygon';
import { Line } from 'react-chartjs-2';



const SearchDetail = () => {
    const context = useContext(SearchContext);
    const [stories, setStories] = useState([]);
    const [livePositions, setLivePositions] = useState([])
    const [isLoading, setIsLoading] = useState(true); 
    const [stockChartXValues, setstockChartXValues] = useState([]);
    const [stockChartYValues, setstockChartYValues] = useState([]);
  
    const dispatch = useDispatch();
    const { id } = useParams();
  
    //polygon news fetch -------------------------------------------------------------
    useEffect(() => {
      if (!context.searchQuery) {
        return;
      }
      const fetchPositionNews = async () =>{
        const polygon = polygonApi()
        polygon.getQuote(context.searchQuery).then((response) => {
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
                setIsLoading(false);
            }
        )
          }
      fetchLivePositions();
    
  
  }, [context.searchQuery]);
  
    if (!context.searchQuery) {
      return null;
    }
  
    if (isLoading) {
      return <h1>Fetching stock data...</h1>;
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
        <div
          className={`pokemon-detail-image-background`}
          
        >
          <div className="pokemon-detail-image">
          <Line data={lineChartData} options={options} />
          </div>
          <div>
          <h1 className="bigger">{context.searchQuery}</h1>
          
          <h1 className="bigger">${parseInt(stockChartYValues[0]).toFixed(2)}</h1>
          </div>
        </div>
        <div className="pokemon-detail-lists">
          <div>
            <h2>Stock Information</h2>
            <ul>
              <li>
                <b>Symbol</b> {context.searchQuery}
              </li>
              <li>
                <b>Current Price</b> ${parseInt(stockChartYValues[0]).toFixed(2)}
              </li>
              
            </ul>
          </div>
          {/* <div>
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
              
          </div> */}
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
  
  const SearchDetailContainer = () => {
    const positions = useSelector((state) => state.positions[state.currentPosition]);
    const dispatch = useDispatch();
  
    return (
  
      <SearchDetail
    
      />
    
    );
  };
  
  export default SearchDetailContainer;