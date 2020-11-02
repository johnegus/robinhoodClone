import { baseUrl } from "../../config";
import { hideForm } from "./ui";

export const LOAD = "LOAD";
export const EXIT = 'EXIT';

export const load = (list) => ({ type: LOAD, list });



export const createPosition = (data) => async (dispatch, getState) => {
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
    // dispatch(hideForm());
    dispatch(getPositions());
    dispatch(hideForm());
  }
};




export const getPositions = () => async (dispatch, getState) => {
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

export const exitPosition = (id) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/positions/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    dispatch(getPositions());
    window.location.replace('/')
  }
};