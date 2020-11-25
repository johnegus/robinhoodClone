import React, { useEffect, useState }  from 'react';

import { Line, Doughnut } from 'react-chartjs-2';
import Orders from './dashboard/Orders'
import Deposits from './dashboard/Deposits'
import { useSelector, useDispatch } from "react-redux";
import {getHistoricalData} from './store/actions/history';
import { getPositions } from "./store/actions/positions";
import NewsFeed from './NewsFeed';
import TopMovers from './TopMovers';
import TopLosers from './TopLosers';



const UserDetail = ({getHistoricalData, history, positions, getPositions}) => {
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);
  
  useEffect(() => {
    getPositions();
  }, []);

  useEffect(() => {
    getHistoricalData();
  }, []);

  //financial modeling prep fetch---------------------------------------------------
  // useEffect(() => {
    
  //   const fetchCompanyInfo = async () =>{
  //     const API_Key = 'f04ddc95561236e9dccd1ffa355ad55b';
  //     let API_CALL = `https://financialmodelingprep.com/api/v3/gainers?apikey=${API_Key}`;
  //     let stockChartXValuesFunction = [];
  //     let stockChartYValuesFunction = [];
    
  //     fetch(API_CALL)
  //     .then(
  //         function(response){
  //             return response.json()
  //         }
  //     )
  //     .then(
  //         function(data){
  //           console.log('fetch  data from FMP')
  //           console.log(data);

  //           for(let key in data){
  //             stockChartXValuesFunction.push(key);
  //             stockChartYValuesFunction.push(data[key]['ticker']);
  //           }
  //             console.log(stockChartXValuesFunction[0][companyName]);
  //             console.log(stockChartYValuesFunction);
  //           // setCompanyDescription(data[0]['description'])
  //           // setExchange(data[0]['exchangeShortName'])
  //           // setImage(data[0]['image'])
              
  //         }
  //     )
  //   }
  //   fetchCompanyInfo();  
  //   //setinterval would go here return the clear interval
  //   //return ()=> clearInterval
  // }, []);
  useEffect(() => {
    if (!history) {
      return;
    }
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    let sum = 0;
    const fetchLivePositions = async () =>{
      
        
        history.map((instance) => {
          
          stockChartYValuesFunction.push(sum+= parseInt(instance.deposit) + (parseInt(instance.soldPrice)*parseInt(instance.shares))-(parseInt(instance.boughtPrice)*parseInt(instance.shares)))
          stockChartXValuesFunction.push(instance.createdAt)
        })
    
        }
              
  
        setstockChartXValues(stockChartXValuesFunction)
        setstockChartYValues(stockChartYValuesFunction)
        // console.log(stockChartXValues)
        // console.log(stockChartYValues)
            
        
      
      fetchLivePositions();
    
  
  }, [history]);
  const deposits = (history.reduce(function (accumulator, instance){
    return accumulator +  parseFloat(instance.deposit);
  }, 0)).toFixed(2);

  const totalCash = (history.reduce(function (accumulator, instance){
    return accumulator + (instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares);
  }, parseFloat(deposits))).toFixed(2);

  const totalAssets = (positions.reduce(function (accumulator, position){
    return accumulator + (position.currentPrice*position.shares);
  }, 0)).toFixed(2);

  const doughnutData = {
    datasets: [{
        data: [totalCash - totalAssets, totalAssets],
        backgroundColor: [
          totalCash - totalAssets > 0 ? 'green' : 'red',
          'orange',
        ],
        borderColor: [
          totalCash - totalAssets > 0 ? 'green' : 'red',
          'orange',
        ],
        borderWidth: 5,
    }],
    

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Cash',
        'Assets'
    ]
};

  const lineChartData = {
    labels: stockChartXValues,
    datasets: [
      {
        label: 'Portfolio Value',
        data: stockChartYValues,
        fill: false,
        backgroundColor:stockChartYValues[0] < stockChartYValues[stockChartYValues.length-1] ? 'green' : 'red',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: stockChartYValues[0] < stockChartYValues[stockChartYValues.length-1] ? 'green' : 'red',
        
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
    }]
    },
  }

  const pieOptions= {
    //cutoutPercentage: 40,
   responsive: true,
 }

return (
  <div className="pokemon-detail">
    <div
      className={`pokemon-detail-image-background`}>
      <div>
      <h1 className="bigger">Welcome to Algo</h1>
      </div>
      
    </div>
    
    <div>
    <Deposits />
    
    </div>
    <div className="user-detail">
      <div className="user-detail-chart">
        <Line data={lineChartData} options={options} />
      </div>
      <div className='doughnut'>
        <Doughnut data={doughnutData} options={pieOptions} />
      </div>
      <div className='user-data-tables'>
         <Orders />
      </div>
      
      <div className='infoGrid__userNews'>
      <NewsFeed />
      </div>
      <div className='infogrid__movers'>
      <TopMovers />
      <TopLosers />
      </div>
    
      
      
    </div>
  </div>
);
 
  };

  

  const UserDetailContainer = () => {
    const positions = useSelector((state) => Object.values(state.positions));
    const history = useSelector((state) => Object.values(state.history));
    const dispatch = useDispatch();
    return (
      <UserDetail
        history={history}
        positions={positions}
        getPositions={() => dispatch(getPositions())}
        getHistoricalData={() => dispatch(getHistoricalData())}
        
      />
    );
  };
  
  export default UserDetailContainer;