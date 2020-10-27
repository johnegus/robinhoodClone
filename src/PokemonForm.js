import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemon } from "./store/actions/pokemon";
import { hideForm } from "./store/actions/ui";

const PokemonForm = ({createPokemon, hideForm }) => {
  const [stockSymbol, setstockSymbol] = useState("");
  const [stockName, setstockName] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");
  const [buyPrice, setbuyPrice] = useState("");
  const [shares, setshares] = useState("");
  const [userId, setUserId] = useState("");
 

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      stockSymbol,
      stockName,
      currentPrice,
      buyPrice,
      shares,
      userId
    };
    createPokemon(payload);
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  return (
    <section className="new-form-holder centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Current Price"
          required
          value={currentPrice}
          onChange={updateProperty(setcurrentPrice)}
        />
        <input
          type="number"
          placeholder="Buy Price"
          required
          value={buyPrice}
          onChange={updateProperty(setbuyPrice)}
        />
         <input
          type="number"
          placeholder="userId"
          required
          value={userId}
          onChange={updateProperty(setUserId)}
        />
        <input
          type="number"
          placeholder="Shares"
          required
          value={shares}
          onChange={updateProperty(setshares)}
        />
        <input
          type="text"
          placeholder="Stock Symbol"
          value={stockSymbol}
          onChange={updateProperty(setstockSymbol)}
        />
        <input
          type="text"
          placeholder="Stock Name"
          value={stockName}
          onChange={updateProperty(setstockName)}
        />
        <button type="submit">Buy Shares!</button>
        <button type="button" onClick={() => hideForm()}>
          Cancel
        </button>
      </form>
    </section>
  );
};

const PokemonFormContainer = () => {
  
  const dispatch = useDispatch();

  return (
    <PokemonForm
      createPokemon={(positions) => dispatch(createPokemon(positions))}
      hideForm={() => dispatch(hideForm())}
    />
  );
};

export default PokemonFormContainer;
