import {WS_CONNECT} from "../constants/action-types";

const websocketInitialState = {
    ws: null
}

export const websocketReducer = (state = {...websocketInitialState}, action: { type: string, payload: { ws: WebSocket } }) => {
    switch (action.type) {
        case WS_CONNECT:
            return Object.assign({}, state, {
                ws: action.payload.ws
            })
        default:
            return state
    }
}