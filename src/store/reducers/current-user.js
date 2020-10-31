import { SET_CURRENT_USER } from "../actions/current-user";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state, 
        currentUser: action.id
      };
    }

    default:
      return state;
  }
}
