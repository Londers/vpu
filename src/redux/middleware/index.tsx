import {
    LOGGED_IN,
    LOGGED_OUT,
    WS_CLOSE,
    WS_CONNECT,
    WS_ERROR,
    WS_MESSAGE,
    WS_OPEN
} from "../constants/action-types";
import {loggedIn, loginError} from "../actions";

export const WebSocketMiddleware = (storeApi: any) => (next: any) => (action: any) => {
    // const state = storeApi.getState() // correctly typed as RootState
    const dispatch = storeApi.dispatch
    switch (action.type) {
        case WS_OPEN:
            console.log('ws open host:', action.payload)
            break
        case WS_CLOSE:
            console.log('ws close host:', action.payload)
            break
        case WS_ERROR:
            console.log('ws error host:', action.payload)
            break
        case WS_MESSAGE:
            const data = JSON.parse(action.payload.evt.data)
            switch (data.type) {
                case 'login':
                    if (data.data.status) {
                        dispatch(loggedIn(data.data.login))
                    } else {
                        dispatch(loginError({}))
                    }
                    break;
                case 'logout':
                    console.log('logout', data.data)
                    break;
                case 'error':
                    console.log('error', data.data)
                    break;
                default:
                    console.log('unknown type', data.data)
                    break;
            }
            console.log('ws message host:', data)
            break
        case WS_CONNECT:
            console.log('ws connect host:', action.payload.host)
            break
    }
    return next(action)
}

export const LoginMiddleware = (storeApi: any) => (next: any) => (action: any) => {
    // const state = storeApi.getState() // correctly typed as RootState
    // const dispatch = storeApi.dispatch
    switch (action.type) {
        case LOGGED_IN:
            localStorage.setItem('login', action.payload)
            console.log('auth logged in', action.payload)
            break
        case LOGGED_OUT:
            localStorage.setItem('login', 'null')
            console.log('auth logged out', action.payload)
            break
    }
    return next(action)
}