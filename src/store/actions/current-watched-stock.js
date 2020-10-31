import { baseUrl } from "../../config";

export const SET_CURRENT_WATCHED_STOCK = "SET_CURRENT_WATCHED_STOCK";

export const setCurrentWatchedStock = (current) => ({ type: SET_CURRENT_WATCHED_STOCK, current });

export const getOneWatchedStock = (id) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/watchlist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const current = await response.json();
    dispatch(setCurrentWatchedStock(current));
  }
};
