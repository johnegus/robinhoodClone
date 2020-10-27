import { SET_CURRENT } from "../actions/current-position";

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT: {
      return action.current.id;
    }

    default:
      return state;
  }
}
