import {SET_CURRENT_WATCHED_STOCK} from '../actions/current-watched-stock';

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_WATCHED_STOCK: {
        return action.current.id;
      }

    default:
      return state;
  }
}