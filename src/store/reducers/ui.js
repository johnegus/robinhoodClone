import { HIDE_FORM, SHOW_FORM } from "../actions/ui";

export default function reducer(state = { formVisible: false }, action) {
  switch (action.type) {
    case HIDE_FORM: {
      return {
        ...state,
        formVisible: false,
      };
    }

    case SHOW_FORM: {
      return {
        ...state,
        formVisible: true,
      };
    }

    default:
      return state;
  }
}
