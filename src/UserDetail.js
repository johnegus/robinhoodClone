import React, { useEffect, useState } from "react";
import { getOneUser } from "./store/actions/current-user";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Chart from './dashboard/Chart'
import Orders from './dashboard/Orders'
import Deposits from './dashboard/Deposits'
import { baseUrl } from "./config";


const UserDetail = (currentUser, getOneUser) => {


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