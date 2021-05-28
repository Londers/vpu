import {LOGGED_IN, LOGGED_OUT, LOGIN_ERROR} from "../constants/action-types";

const login = localStorage.getItem('login')

const authInitialState = {
    loginError: false,
    logged: (login !== 'null') && (login !== undefined),
    login: login,
};

export const authReducer = (state = {...authInitialState}, action: {
    type: string,
    payload: { login?: string }
}) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                loginError: true
            })
        case LOGGED_IN:
            return Object.assign({}, state, {
                logged: true,
                login: action.payload.login,
                loginError: false
            })
        case LOGGED_OUT:
            return Object.assign({}, state, {
                logged: false,
                login: undefined
            })
        default:
            return state
    }
};