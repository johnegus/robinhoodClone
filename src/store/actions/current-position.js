import { baseUrl } from "../../config";

export const SET_CURRENT = "SET_CURRENT";

export const setCurrent = (current) => ({ type: SET_CURRENT, current });

export const getOnePosition = (id) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/positions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const current = await response.json();
    dispatch(setCurrent(current));
  }
};


