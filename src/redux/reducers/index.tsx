import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {websocketReducer} from "./websocketReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    websocket: websocketReducer
})

export default rootReducer