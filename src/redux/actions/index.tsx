import {
    WS_CONNECT,
    WS_OPEN,
    WS_CLOSE,
    WS_ERROR,
    WS_MESSAGE,
    LOGGED_IN,
    LOGGED_OUT,
    LOGIN_ERROR,
    SET_PHONE_TABLE_DATA,
    SET_PHONE_TABLE_ROW,
    REMOVE_PHONE_TABLE_ROW,
    CREATE_PHONE_TABLE_ROW,
    SET_ACCOUNT_TABLE_DATA,
    SET_ACCOUNT_TABLE_ROW,
    REMOVE_ACCOUNT_TABLE_ROW,
    CREATE_ACCOUNT_TABLE_ROW,
} from "../constants/action-types";
import wsImitation from "../../Components/WebSoscketImitation";

// // websocket
// export function wsConnect(payload: {ws: WebSocket}) {
//     return {type: WS_CONNECT, payload};
// }
//
// export function wsConnect(payload: {ws: wsImitation}) {
//     return {type: WS_CONNECT, payload};
// }
//
// export function wsOpen(payload: {evt: Event}) {
//     return {type: WS_OPEN, payload};
// }
//
// export function wsClose(payload: {evt: Event}) {
//     return {type: WS_CLOSE, payload};
// }
//
// export function wsError(payload: {evt: Event}) {
//     return {type: WS_ERROR, payload};
// }
//
// export function wsMessage(payload: {evt: Event}) {
//     return {type: WS_MESSAGE, payload};
// }

export function wsConnect(payload: { ws: wsImitation }) {
    return {type: WS_CONNECT, payload};
}

export function wsOpen(payload: { evt: string }) {
    return {type: WS_OPEN, payload};
}

export function wsClose(payload: { evt: string }) {
    return {type: WS_CLOSE, payload};
}

export function wsError(payload: { evt: string }) {
    return {type: WS_ERROR, payload};
}

export function wsMessage(payload: { evt: Object }) {
    return {type: WS_MESSAGE, payload};
}

// login
export function loggedIn(payload: { login: string }) {
    return {type: LOGGED_IN, payload};
}

export function loggedOut() {
    return {type: LOGGED_OUT};
}

export function loginError(payload: {}) {
    return {type: LOGIN_ERROR, payload};
}

// phones table
export function setPhoneTableData(payload: any) {
    return {type: SET_PHONE_TABLE_DATA, payload}
}

export function setPhoneTableRow(payload: any) {
    return {type: SET_PHONE_TABLE_ROW, payload}
}

export function removePhoneTableRow(payload: any) {
    return {type: REMOVE_PHONE_TABLE_ROW, payload}
}

export function createPhoneTableRow(payload: any) {
    return {type: CREATE_PHONE_TABLE_ROW, payload}
}

// accounts table
export function setAccountTableData(payload: any) {
    return {type: SET_ACCOUNT_TABLE_DATA, payload}
}

export function setAccountTableRow(payload: any) {
    return {type: SET_ACCOUNT_TABLE_ROW, payload}
}

export function removeAccountTableRow(payload: any) {
    return {type: REMOVE_ACCOUNT_TABLE_ROW, payload}
}

export function createAccountTableRow(payload: any) {
    return {type: CREATE_ACCOUNT_TABLE_ROW, payload}
}