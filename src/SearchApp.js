import React,{useEffect, useState} from 'react';
import Recipe from "./Recipe";

const SearchApp = () => {

  const API_Key = '06N03QCM2TDKP6QS';

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('');
const [isLoading, setIsLoading] = useState(true); 



useEffect(()=>{
  const getRecipes =  async () => {
    if (!query) {
      return;
    }
    const response = fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_Key}`)
    const data = await response.json();
    setRecipes(data.bestMatches);
     console.log(data.bestMatches); 
      setIsLoading(false);
    }
   getRecipes();
}, [query]);



const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" placeholder="Search Stock Symbol" type="text" value={search} onChange={updateSearch} />
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        source={recipe.recipe.source} />
      ))}
      </div>
    </div>
  );
};

export default SearchApp;
