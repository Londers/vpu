import { LOGGED_IN, LOGGED_OUT } from "../constants/action-types";

const login = localStorage.getItem('login')

const initialState = {
    logged: (login !== null) && (login !== undefined),
    login: login
}

function rootReducer(state = initialState, action: {type: String, payload: {login: string}}) {
    if (action.type === LOGGED_IN) {
        return Object.assign({}, state, {
            logged: true,
            login: action.payload.login
        })
    }
    if (action.type === LOGGED_OUT) {
        return Object.assign({}, state, {
            logged: false,
            login: undefined
        })
    }
    return state
}

export default rootReducer