import { baseUrl } from "../../config";

export const LOAD_HISTORY = "LOAD_HISTORY";
export const load = (historyList) => ({ type: LOAD_HISTORY, historyList });

export const createInstance = (data) => async (dispatch, getState) => {
    const {
      authentication: { token },
    } = getState();
    const response = await fetch(`${baseUrl}/history`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      
      dispatch(getHistoricalData());
    }
  };
  
  
  
  
  export const getHistoricalData = () => async (dispatch, getState) => {
    const {
      authentication: { token },
    } = getState();
    const response = await fetch(`${baseUrl}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const historyList = await response.json();
      dispatch(load(historyList));
    }
  };