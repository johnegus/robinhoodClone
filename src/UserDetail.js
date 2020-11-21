import React, { useEffect, useState }  from 'react';

import { Line } from 'react-chartjs-2';
import Orders from './dashboard/Orders'
import Deposits from './dashboard/Deposits'
import { useSelector, useDispatch } from "react-redux";
import {getHistoricalData} from './store/actions/history';



const UserDetail = ({getHistoricalData, history}) => {
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);

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
    const fetchLivePositions = () =>{
      
        
        history.map((instance) => {
          
          stockChartYValuesFunction.push(sum+= (instance.deposit + (instance.soldPrice*instance.shares)-(instance.boughtPrice*instance.shares)))
          stockChartXValuesFunction.push(instance.createdAt)
        })
    
        }
              
  
        setstockChartXValues(stockChartXValuesFunction)
        setstockChartYValues(stockChartYValuesFunction)
        console.log(stockChartXValues)
        console.log(stockChartYValues)
            
        
      
      fetchLivePositions();
    
  
  }, [history]);

  const lineChartData = {
    labels: stockChartXValues,
    datasets: [
      {
        label: 'Portfolio Value',
        data: stockChartYValues,
        fill: false,
        backgroundColor:'green',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'green' 
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
        // ticks: {
        //   reverse: true,
        // }
    }]
    },
  }

return (
  <div className="pokemon-detail">
    <div
      className={`pokemon-detail-image-background`}
      
    >
      <div>
      <h1 className="bigger">Welcome to Algo</h1>
      </div>
      
    </div>
    
    <div>
    <Deposits />
    </div>
    
    <div className="user-detail-chart">
    <Line data={lineChartData} options={options} />
    
      <div>
      
      <Orders />
      
      
      </div>
      
    </div>
  </div>
);
 
  };

  

  const UserDetailContainer = () => {
    const history = useSelector((state) => Object.values(state.history));
    const dispatch = useDispatch();
    return (
      <UserDetail
        history={history}
        getHistoricalData={() => dispatch(getHistoricalData())}
        
      />
    );
  };
  
  export default UserDetailContainer;