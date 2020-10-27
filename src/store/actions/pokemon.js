import { baseUrl } from "../../config";
import { hideForm } from "./ui";

export const LOAD = "LOAD";

export const load = (list) => ({ type: LOAD, list });

export const createPokemon = (data) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/positions`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    dispatch(getPokemon());
  }
};

export const getPokemon = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/positions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};
