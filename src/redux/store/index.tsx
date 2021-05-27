import {applyMiddleware, createStore} from "redux"
import rootReducer from "../reducers/index"
import {LoginMiddleware, WebSocketMiddleware} from "../middleware";

const store = createStore(
    rootReducer,
    applyMiddleware(WebSocketMiddleware, LoginMiddleware)
)

export default store