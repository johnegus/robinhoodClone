import React, { useEffect, useState } from "react";
import { getOneUser } from "./store/actions/current-user";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Chart from './dashboard/Chart'
import Orders from './dashboard/Orders'
import Deposits from './dashboard/Deposits'
import { baseUrl } from "./config";

const UserDetail = (currentUser, getOneUser) => {
  const [ticker, setTicker] = useState('');
  const [liveimage, setImage] = useState('');
  const [liveexchange, setExchange] = useState('');

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
    <Chart />
    
    <div className="pokemon-detail-lists">
      
    
      <div>
      
      <Orders />
      
      
      </div>
      
    </div>
    
  </div>
);
 
  };

  
  export default UserDetail;