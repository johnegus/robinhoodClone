import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import authentication from "./reducers/authentication";
import positions from "./reducers/positions";
import ui from "./reducers/ui";
import currentPosition from "./reducers/current-position";
import currentUser from "./reducers/current-user";
import watchedStocks from './reducers/watched-stocks';
import history from './reducers/history';
import currentWatchedStock from './reducers/current-watched-stock'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  positions,
  ui,
  currentPosition,
  currentUser,
  watchedStocks,
  currentWatchedStock,
  history
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
