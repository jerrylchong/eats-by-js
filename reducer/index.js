import {combineReducers} from "redux";
import authenticationReducer from "./authenticationReducer"
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";


export default combineReducers({
    token: authenticationReducer,
    user: userReducer,
    location: locationReducer
})
