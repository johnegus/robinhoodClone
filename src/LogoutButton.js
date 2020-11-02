import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "./store/actions/authentication";
import {Link} from 'react-router-dom'; 


const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
    
    <div id="logout-button-holder">
    <Link to="/">
          <button type="button">
          Profile
          </button>
        </Link>
      <button onClick={handleClick}>Logout</button>
    </div>
    </>
    
  );
};

export default LogoutButton;
