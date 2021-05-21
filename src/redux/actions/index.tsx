import {LOGGED_IN, LOGGED_OUT} from "../constants/action-types";

export function loggedIn(payload: { login: string }) {
    return {type: LOGGED_IN, payload};
}

export function loggedOut() {
    return {type: LOGGED_OUT};
}