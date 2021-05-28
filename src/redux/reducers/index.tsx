import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {websocketReducer} from "./websocketReducer";
import {tablesReducer} from "./tablesReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    websocket: websocketReducer,
    tables: tablesReducer,
})

export default rootReducer