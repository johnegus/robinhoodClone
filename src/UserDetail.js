import React from "react";

import { Line } from 'react-chartjs-2';
import Orders from './dashboard/Orders'
import Deposits from './dashboard/Deposits'

const data = {
  labels: ["2020-10-30 20:00:00", "2020-10-30 19:55:00", "2020-10-30 19:50:00", "2020-10-30 19:20:00", "2020-10-30 18:55:00", "2020-10-30 18:50:00", "2020-10-30 18:30:00", "2020-10-30 18:20:00", "2020-10-30 17:55:00", "2020-10-30 17:35:00",
],
  datasets: [
    {
      label: 'Portfolio',
      data: ["265.3000", "265.3500", "265.3000", "265.5000", "265.6800", "265.5000", "265.5100", "265.5400", "265.5100", "265.7800"],
      fill: false,
      backgroundColor: 'green',
      borderColor: 'green',
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
        display: false,
        ticks: {
          beginAtZero: false,
        },
      },
    ],
    xAxes: [{
      display: false,
      ticks: {
        reverse: false,
      }
  }]
  },
}

const UserDetail = () => {


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



return (
  <div className="pokemon-detail">
    <div
      className={`pokemon-detail-image-background`}
      
    >
      <div>
      <h1 className="bigger">Welcome to Algo</h1>
      </div>
      
    </div>
    <Deposits />
    <Line data={data} options={options} />
    
    <div className="pokemon-detail-lists">
      
    
      <div>
      
      <Orders />
      
      
      </div>
      
    </div>
  </div>
);
 
  };

  
  export default UserDetail;