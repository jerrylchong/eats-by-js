import {combineReducers} from "redux";
import authenticationReducer from "./authenticationReducer"
import userReducer from "./userReducer";


export default combineReducers({
    token: authenticationReducer,
    user: userReducer
})
