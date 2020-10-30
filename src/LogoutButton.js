import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { logout } from "./store/actions/authentication";
import SearchApp from './search/SearchApp'
import SearchResults from './search/SearchResults'
import {SearchContext} from './search/SearchContext'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
    <div id="searchbar-holder">
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <SearchApp />
      <SearchResults />
    </SearchContext.Provider>
    </div>
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
    </>
    
  );
};

export default LogoutButton;
