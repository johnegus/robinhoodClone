import React, { useEffect, useState } from "react";
import { getOneUser } from "./store/actions/current-user";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Chart from './dashboard/Chart'
import Orders from './dashboard/Orders'
import Deposits from './dashboard/Deposits'


const UserDetail = (currentUser, getOneUser) => {
// const { id } = {currentUser};



//   const dispatch = useDispatch();

//   useEffect(() => {
//     getOneUser(id);
//   }, [id]);

//   if (!currentUser) {
//     return null;


//   }

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

  // const UserDetailContainer = () => {
  //   const user = useSelector((state) => state.currentUser);
  //   const dispatch = useDispatch();
  
  //   return (
  
  //     <UserDetail
  //     user={user}
  //       getOneUser={(id) => dispatch(getOneUser(id))}
        
  //     />
    
  //   );
  // };
  
  export default UserDetail;