import React, { useEffect, useState } from "react";
import { getOneUser } from "./store/actions/current-user";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";



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
  <div>
    <h3 className="UserDetail">Welcome to Algo</h3>
    
  </div>
  )
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