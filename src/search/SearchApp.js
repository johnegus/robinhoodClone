import React,{useContext, useState} from 'react';
import { SearchContext } from './SearchContext';

const SearchApp = () => {

  const context = useContext(SearchContext);
  const [inputValue, setInputValue] = useState('');

  const updateInputVal = e => {
    setInputValue(e.target.value.toUpperCase());
  };

  const searchForStock = e => {
    e.preventDefault();
    context.setSearchQuery(inputValue);
  };

  return(
    <div className="App">
      <form onSubmit={searchForStock} className="search-form">
        <input className="search-bar" placeholder="Search Stock Symbol" type="text" value={inputValue} onChange={updateInputVal} />
      </form>
    </div>
  );
};

export default SearchApp;
