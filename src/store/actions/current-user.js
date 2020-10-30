import { baseUrl } from "../../config";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = (current) => ({ type: SET_CURRENT_USER, current });

export const getOneUser = (id) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const current = await response.json();
    dispatch(setCurrentUser(current));
  }
};