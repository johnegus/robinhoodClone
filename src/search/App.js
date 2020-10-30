import React, { useState } from 'react';
import { SearchContext } from './SearchContext';
import SearchResults from './SearchResults';
import SearchApp from './SearchApp';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <SearchResults />
      <SearchApp />
    </SearchContext.Provider>
  );
};

export default App;