import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "./store/actions/authentication";
import {Link} from 'react-router-dom'; 
import Button from '@material-ui/core/Button';


const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
    
    <div id="logout-button-holder">
    <Link to="/">
          <Button variant="contained" color='primary'>
          Profile
          </Button>
        </Link>
      <Button variant="contained" color='primary' onClick={handleClick}>Logout</Button>
    </div>
    </>
    
  );
};

export default LogoutButton;
