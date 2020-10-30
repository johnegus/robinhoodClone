import { SET_CURRENT_USER } from "../actions/current-user";

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return action.current.id;
    }

    default:
      return state;
  }
}
