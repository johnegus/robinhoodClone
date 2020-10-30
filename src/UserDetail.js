import React, { useEffect, useState } from "react";
import { getOneUser } from "./store/actions/current-user";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetail = ({users, getOneUser}) => {
  const { id } = useParams();



  const dispatch = useDispatch();
  useEffect(() => {
    getOneUser(id);
  }, [id]);
  return (
  <div>
    <h3 className="UserDetail">Welcome to Algo</h3>
    
  </div>
  )
  };

  const UserDetailContainer = () => {
    const users = useSelector((state) => state.users[state.currentUser]);
    const dispatch = useDispatch();
  
    return (
  
      <UserDetail
      users={users}
        getOneUser={(id) => dispatch(getOneUser(id))}
        
      />
    
    );
  };
  
  export default UserDetailContainer;