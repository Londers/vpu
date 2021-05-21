import {applyMiddleware, createStore} from "redux"
import rootReducer from "../reducers/index"
import {returnToMainMiddleware} from "../middleware";

const store = createStore(
    rootReducer,
    applyMiddleware(returnToMainMiddleware)
)

export default store