import merge from "lodash/merge";
import { LOAD_WATCHED, EXIT_WATCHED } from "../actions/watched-stocks";


export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    
    case LOAD_WATCHED: {
      const watchedStocks = action.watchedList.map((watchedStock) => ({ [watchedStock.id]: watchedStock }));
        return merge({}, state, ...watchedStocks);
      
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