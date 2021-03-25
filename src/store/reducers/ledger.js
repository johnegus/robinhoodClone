import merge from "lodash/merge";
import { LOAD_HISTORY } from "../actions/ledger";


export default function reducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_HISTORY: {
      const ledger = action.historyList.map((instance) => ({ [instance.id]: instance }));
      return merge({}, state, ...ledger);
    }
    default:
      return state;
  }
}