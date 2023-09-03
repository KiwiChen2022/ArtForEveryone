import { createStore, applyMiddleware } from "redux";
import languageReducer from "./reducers/languageReducer";
import languageMiddleware from "./languageMiddleware";

const store = createStore(languageReducer, applyMiddleware(languageMiddleware));

export default store;
