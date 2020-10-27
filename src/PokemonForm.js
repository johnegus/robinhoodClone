import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPokemon } from "./store/actions/pokemon";
import { getPokemonTypes } from "./store/actions/pokemon-types";
import { hideForm } from "./store/actions/ui";

const PokemonForm = ({ types, getPokemonTypes, createPokemon, hideForm }) => {
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [move1, setMove1] = useState("");
  const [move2, setMove2] = useState("");

  useEffect(() => {
    getPokemonTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      moves: [move1, move2],
      attack,
      defense,
      imageUrl,
      name,
      type,
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
          placeholder="Attack"
          min="0"
          max="100"
          required
          value={attack}
          onChange={updateProperty(setAttack)}
        />
        <input
          type="number"
          placeholder="Defense"
          min="0"
          max="100"
          required
          value={defense}
          onChange={updateProperty(setDefense)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateProperty(setImageUrl)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateProperty(setName)}
        />
        <input
          type="text"
          placeholder="Move 1"
          value={move1}
          onChange={updateProperty(setMove1)}
        />
        <input
          type="text"
          placeholder="Move 2"
          value={move2}
          onChange={updateProperty(setMove2)}
        />
        <select onChange={updateProperty(setType)}>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <button type="submit">Create new Pokemon</button>
        <button type="button" onClick={() => hideForm()}>
          Cancel
        </button>
      </form>
    </section>
  );
};

const PokemonFormContainer = () => {
  const types = useSelector((state) => state.pokemonTypes);
  const dispatch = useDispatch();

  return (
    <PokemonForm
      types={types}
      getPokemonTypes={() => dispatch(getPokemonTypes())}
      createPokemon={(pokemon) => dispatch(createPokemon(pokemon))}
      hideForm={() => dispatch(hideForm())}
    />
  );
};

export default PokemonFormContainer;
