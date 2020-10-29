import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store/actions/authentication";
import SearchApp from './SearchApp'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
    <div id="searchbar-holder">
      <SearchApp />
    </div>
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
    </>
    
  );
};

export default LogoutButton;
