import { LOAD_TYPES } from "../actions/pokemon-types";

export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD_TYPES: {
      return action.types;
    }

    default:
      return state;
  }
}
