import merge from "lodash/merge";
import { LOAD_HISTORY } from "../actions/history";


export default function reducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_HISTORY: {
      const history = action.historyList.map((instance) => ({ [instance.id]: instance }));
      return merge({}, state, ...history);
    }
    default:
      return state;
  }
}