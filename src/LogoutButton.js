import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store/actions/authentication";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div id='topnav'>
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
    </div>
  );
};

export default LogoutButton;
