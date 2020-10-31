import merge from "lodash/merge";
import { LOAD_WATCHED, EXIT_WATCHED } from "../actions/watched-stocks";
import {SET_CURRENT_WATCHED_STOCK} from '../actions/current-watched-stock';


export default function reducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_WATCHED: {
      const watchedStocks = action.list.map((watchedStock) => ({ [watchedStock.id]: watchedStock }));
      return merge({}, state, ...watchedStocks);
    }
    case SET_CURRENT_WATCHED_STOCK: {
      return {
        ...state,
        [action.current.id]: action.current,
      };
    }
    case EXIT_WATCHED: {
      let newState = {...state }
      delete newState[action.current.id]
      return{
      ...newState,
      }
    }
    default:
      return state;
  }
}