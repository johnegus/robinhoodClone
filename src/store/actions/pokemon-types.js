import { baseUrl } from "../../config";

export const LOAD_TYPES = "pokedex/authentication/LOAD_TYPES";

export const loadTypes = (types) => ({ type: LOAD_TYPES, types });

export const getPokemonTypes = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/pokemon/types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(loadTypes(list));
  }
};
