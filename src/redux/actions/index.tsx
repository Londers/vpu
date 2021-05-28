import {
    LOGGED_IN,
    LOGGED_OUT,
    LOGIN_ERROR, SET_PHONE_TABLE_DATA,
    WS_CLOSE,
    WS_CONNECT,
    WS_ERROR,
    WS_MESSAGE,
    WS_OPEN,
} from "../constants/action-types";

// websocket
export function wsConnect(payload: {ws: WebSocket}) {
    return {type: WS_CONNECT, payload};
}

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

// login
export function loggedIn(payload: { login: string }) {
    return {type: LOGGED_IN, payload};
}

export function loginError(payload: {}) {
    return {type: LOGIN_ERROR, payload};
}

export function loggedOut() {
    return {type: LOGGED_OUT};
}

// other
export function setPhoneTableData(payload: any) {
    return {type: SET_PHONE_TABLE_DATA, payload}
}