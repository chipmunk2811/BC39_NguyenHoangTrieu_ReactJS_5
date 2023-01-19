import { combineReducers } from "redux";
import userReducer from "./user/user";

const rootReducer = combineReducers({
    userReducer,
})

export default rootReducer;