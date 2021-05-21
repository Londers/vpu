import {LOGGED_IN, LOGGED_OUT} from "../constants/action-types";

export function returnToMainMiddleware() {
    return function(next: Function) {
        return function(action: {type: string, payload: {login: string}}) {
            if (action.type === LOGGED_IN) {
                localStorage.setItem('login', action.payload.login)
            }
            if (action.type === LOGGED_OUT) {
                window.location.href = window.location.origin
                localStorage.removeItem('login')
            }
            return next(action);
        };
    };
}