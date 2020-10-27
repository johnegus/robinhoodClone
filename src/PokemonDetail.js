import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { imageUrl } from "./config";
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
        style={{
          backgroundImage: `url('${imageUrl}/images/${pokemon.type}.jpg')`,
        }}
      >
        <div
          className="pokemon-detail-image"
          style={{ backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')` }}
        ></div>
        <h1 className="bigger">{pokemon.name}</h1>
      </div>
      <div className="pokemon-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <b>Type</b> {pokemon.type}
            </li>
            <li>
              <b>Attack</b> {pokemon.attack}
            </li>
            <li>
              <b>Defense</b> {pokemon.defense}
            </li>
            <li>
              <b>Moves</b>
              <ul>
                {pokemon.moves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
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
            <tbody>
              {pokemon.items.map((item) => (
                <tr key={item.price * item.happiness}>
                  <td>
                    <img
                      className="item-image"
                      alt={item.imageUrl}
                      src={`${imageUrl}${item.imageUrl}`}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className="centered">{item.happiness}</td>
                  <td className="centered">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PokemonDetailContainer = () => {
  const pokemon = useSelector((state) => state.pokemon2[state.currentPokemon]);
  const dispatch = useDispatch();

  return (
    <PokemonDetail
      pokemon={pokemon}
      getOnePokemon={(id) => dispatch(getOnePokemon(id))}
    />
  );
};

export default PokemonDetailContainer;
