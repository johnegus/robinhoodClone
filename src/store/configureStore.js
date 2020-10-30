import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import authentication from "./reducers/authentication";
import positions from "./reducers/positions";
import ui from "./reducers/ui";
import currentPosition from "./reducers/current-position";
import currentUser from "./reducers/current-user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  positions,
  ui,
  currentPosition,
  currentUser
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
