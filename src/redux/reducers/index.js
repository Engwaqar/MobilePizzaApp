// Importing: Dependencies
import { combineReducers } from "redux";

// Importing: Reducers
import * as userReducers from "./user.reducers";

// Redux: Root Reducer
const rootReducer = combineReducers(Object.assign(userReducers));
// Exports
export default rootReducer;
