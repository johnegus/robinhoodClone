import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import { imageUrl } from "./config";
import LogoutButton from "./LogoutButton";
import PokemonDetail from "./PokemonDetail";
import PokemonForm from "./PokemonForm";
import Fab from "./Fab";
import { showForm } from "./store/actions/ui";
import { getPokemon } from "./store/actions/pokemon";

const PokemonBrowser = ({ pokemon, getPokemon, formVisible, showForm }) => {
  useEffect(() => {
    getPokemon();
  }, []);

  const { id } = useParams();
  const pokemonId = Number.parseInt(id);

  if (!pokemon) {
    return null;
  }
  return (
    <main>
      <LogoutButton />
      <nav>
        <Fab hidden={formVisible} onClick={showForm} />
        {pokemon.map((pokemon) => {
          return (
            <NavLink key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
              <div
                className={
                  pokemonId === pokemon.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
                <div
                  className="nav-entry-image">+35%</div>
                <div>
                  <div className="primary-text">{pokemon.stockName}</div>
                  <div className="secondary-text">
                  ${pokemon.currentPrice}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
      {formVisible ? (
        <PokemonForm />
      ) : (
        <Switch>
          <Route
            exact={true}
            path="/pokemon/:id"
            render={(props) => <PokemonDetail {...props} />}
          />
          <Redirect to="/" />
        </Switch>
      )}
    </main>
  );
};

const PokemonBrowserContainer = () => {
  const formVisible = useSelector((state) => state.ui.formVisible);
  const pokemon = useSelector((state) => Object.values(state.pokemon2));
  const dispatch = useDispatch();
  return (
    <PokemonBrowser
      pokemon={pokemon}
      formVisible={formVisible}
      getPokemon={() => dispatch(getPokemon())}
      showForm={() => dispatch(showForm())}
    />
  );
};

export default PokemonBrowserContainer;
