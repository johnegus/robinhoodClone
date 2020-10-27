import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getOnePokemon } from "./store/actions/current-poke";

const PokemonDetail = ({ pokemon, getOnePokemon }) => {
  const { id } = useParams();
  useEffect(() => {
    getOnePokemon(id);
  }, [id]);

  if (!pokemon || !pokemon.moves) {
    return null;
  }
  return (
    <div className="pokemon-detail">
      <div
        className={`pokemon-detail-image-background`}
        
      >
        <div
          className="pokemon-detail-image"
          
        ></div>
        <h1 className="bigger">{pokemon.stockName}</h1>
      </div>
      <div className="pokemon-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <b>Type</b> {pokemon.stockSymbol}
            </li>
            <li>
              <b>Attack</b> {pokemon.stockName}
            </li>
            <li>
              <b>Defense</b> {pokemon.currentPrice}
            </li>
            
          </ul>
        </div>
        <div>
          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Happiness</th>
                <th>Price</th>
              </tr>
            </thead>
            
          </table>
        </div>
      </div>
    </div>
  );
};

const PokemonDetailContainer = () => {
  const pokemon = useSelector((state) => state.pokemon2);
  const dispatch = useDispatch();

  return (
    <PokemonDetail
      pokemon={pokemon}
      getOnePokemon={(id) => dispatch(getOnePokemon(id))}
    />
  );
};

export default PokemonDetailContainer;
