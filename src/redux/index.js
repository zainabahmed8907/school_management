import { combineReducers } from "redux";
import AuthSlice from "./Slice/AuthSlice";
const rootReducer = combineReducers({
  auth: AuthSlice,
});

export default rootReducer;
