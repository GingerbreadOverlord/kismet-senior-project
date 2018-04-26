import { createStore } from "redux";
import rootReducer from "./reducers/index.js";

const initialState = {};

const store = createStore(rootReducer, initialState);

export default store;