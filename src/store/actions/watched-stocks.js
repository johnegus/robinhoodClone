import { baseUrl } from "../../config";

export const LOAD_WATCHED = "LOAD_WATCHED";
export const EXIT_WATCHED = 'EXIT_WATCHED';

export const loadWatched = (list) => ({ type: LOAD_WATCHED, list });



export const createWatchedStock = (data) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/watchlist`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(getWatchedStocks());
  }
};




export const getWatchedStocks = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/watchlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(loadWatched(list));
  } 
};

export const exitWatchedStock = (id) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/watchlist/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    dispatch(getWatchedStocks());
  }
};