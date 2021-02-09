import React,{useContext, useState} from 'react';
import { SearchContext } from './SearchContext';
import CloseIcon from '@material-ui/icons/Close';

const SearchApp = () => {

  const context = useContext(SearchContext);
  const [inputValue, setInputValue] = useState('');

  const updateInputVal = e => {
    setInputValue(e.target.value.toUpperCase());
  };
  const close = async e => {
    e.preventDefault();
    await setInputValue('');
    context.setSearchQuery('');
    
  };

  const searchForStock = e => {
    e.preventDefault();
    context.setSearchQuery(inputValue);
  };

  return(
    <div className="App">
      {context.searchQuery ? <CloseIcon className='close-search' onClick={close}></CloseIcon>: ''}
      <form onSubmit={searchForStock} className="search-form">
        <input className="search-bar" placeholder="Search Stock Symbol" type="text" value={inputValue} onChange={updateInputVal} />
        
      </form>
      
    </div>
  );
};

export default SearchApp;
