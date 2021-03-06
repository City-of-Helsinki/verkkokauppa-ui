import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";

import * as reducers from "./modules";

export default function configureStore(initialState) {
    const rootReducer = combineReducers(reducers);

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware
        ),
    );
}