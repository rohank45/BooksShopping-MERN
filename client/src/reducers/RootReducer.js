import { combineReducers } from "redux";

import CartReducer from "./CartReducer";

const RootReducer = combineReducers({ CartReducer });

export default RootReducer;
