import merge from "lodash/merge";
import { LOAD, EXIT } from "../actions/positions";
import { SET_CURRENT } from "../actions/current-position";


export default function reducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD: {
      const positions = action.list.map((position) => ({ [position.id]: position }));
      return merge({}, state, ...positions);
    }
    case SET_CURRENT: {
      return {
        ...state,
        [action.current.id]: action.current,
      };
    }
    case EXIT: {
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
