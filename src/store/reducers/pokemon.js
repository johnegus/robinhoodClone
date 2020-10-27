import merge from "lodash/merge";
import { LOAD } from "../actions/pokemon";
import { SET_CURRENT } from "../actions/current-poke";

export default function reducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD: {
      const pokemon = action.list.map((poke) => ({ [poke.id]: poke }));
      return merge({}, state, ...pokemon);
    }
    case SET_CURRENT: {
      return {
        ...state,
        [action.current.id]: action.current,
      };
    }

    default:
      return state;
  }
}
