import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import authentication from "./reducers/authentication";
import pokemon2 from "./reducers/pokemon";
import pokemonTypes from "./reducers/pokemon-types";
import ui from "./reducers/ui";
import currentPokemon from "./reducers/current-poke";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  pokemonTypes,
  pokemon2,
  ui,
  currentPokemon,
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
