import {combineReducers} from "redux";
import authenticationReducer from "./authenticationReducer"
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";
import tagReducer from "./tagReducer";


export default combineReducers({
    token: authenticationReducer,
    user: userReducer,
    location: locationReducer,
    tags: tagReducer
})
