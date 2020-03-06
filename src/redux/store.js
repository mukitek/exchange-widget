import {applyMiddleware, createStore} from "redux";
import {appReducer} from "./reducers";
import thunkMiddleware from "redux-thunk";

export const store = createStore(appReducer, applyMiddleware(
    thunkMiddleware
));
