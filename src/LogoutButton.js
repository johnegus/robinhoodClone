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
    
    <div className="logout-button-holder2">
    <Link to="/">
          <button type="button">
          Dashboard
          </button>
        </Link>
      <button type="button" onClick={handleClick}>Logout</button>
    </div>
    </>
    
  );
};

export default LogoutButton;
