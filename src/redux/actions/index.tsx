import {
    LOGGED_IN,
    LOGGED_OUT,
    LOGIN_ERROR,
    WS_CLOSE,
    WS_CONNECT,
    WS_ERROR,
    WS_MESSAGE,
    WS_OPEN,
} from "../constants/action-types";

// export function mainPageWebSocket(payload: { wss: string }) {
//     return {type: MAIN_PAGE_WEBSOCKET, payload};
// }
// export function wsConnected() {
//     return {type: WS_CONNECTED};
// }
// export function wsDisconnected() {
//     return {type: WS_DISCONNECTED};
// }

// export function wsMessage(payload: {type: string, data: any}) {
// export function wsMessage(payload: {type: string, login: string, password: string}) {
//     return {type: WS_MESSAGE, payload};
// }

export function wsConnect(payload: {ws: WebSocket}) {
    return {type: WS_CONNECT, payload};
}

// export function wsDisconnect() {
//     return {type: WS_DISCONNECT};
// }

export function wsOpen(payload: {evt: Event}) {
    return {type: WS_OPEN, payload};
}

export function wsClose(payload: {evt: Event}) {
    return {type: WS_CLOSE, payload};
}

export function wsError(payload: {evt: Event}) {
    return {type: WS_ERROR, payload};
}

export function wsMessage(payload: {evt: Event}) {
    return {type: WS_MESSAGE, payload};
}

// export function wsSend(payload : {type : string, login: string, password: string}) {
//     return {type: WS_SEND, payload};
// }

export function loggedIn(payload: { login: string }) {
    return {type: LOGGED_IN, payload};
}

export function loginError(payload: {}) {
    return {type: LOGIN_ERROR, payload};
}

export function loggedOut() {
    return {type: LOGGED_OUT};
}