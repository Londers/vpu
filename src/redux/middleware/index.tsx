import {
    LOGGED_IN,
    LOGGED_OUT,
    WS_CLOSE,
    WS_CONNECT,
    WS_ERROR,
    WS_MESSAGE,
    WS_OPEN
} from "../constants/action-types"
import {
    createPhoneTableRow,
    loggedIn,
    loginError,
    removePhoneTableRow,
    setPhoneTableData,
    setPhoneTableRow
} from "../actions"

export const WebSocketMiddleware = (storeApi: any) => (next: any) => (action: any) => {
    // const state = storeApi.getState() // correctly typed as RootState
    const dispatch = storeApi.dispatch
    switch (action.type) {
        case WS_OPEN:
            console.log('ws open', action.payload)
            break
        case WS_CLOSE:
            console.log('ws close', action.payload)
            break
        case WS_ERROR:
            console.log('ws error', action.payload)
            break
        case WS_MESSAGE:
            const data = JSON.parse(action.payload.evt.data)
            switch (data.type) {
                case 'login':
                    if (data.data.status) {
                        document.cookie = ('Authorization=Bearer ' + data.data.token)
                        dispatch(loggedIn(data.data.login))
                    } else {
                        dispatch(loginError({}))
                    }
                    break

                case 'phoneTable':
                    dispatch(setPhoneTableData(data.data))
                    console.log('phoneTable', data.data)
                    break
                case 'updatePhone':
                    dispatch(setPhoneTableRow(data.data))
                    console.log('updatePhone', data.data)
                    break
                case 'removePhone':
                    dispatch(removePhoneTableRow(data.data))
                    console.log('removePhone', data.data)
                    break
                case 'createPhone':
                    dispatch(createPhoneTableRow(data.data))
                    console.log('createPhone', data.data)
                    break

                case 'logout':
                    document.cookie = ''
                    console.log('logout', data.data)
                    break
                case 'error':
                    console.log('error', data.data)
                    break
                default:
                    console.log('unknown type', data.data)
                    break
            }
            console.log('ws message', data)
            break
        case WS_CONNECT:
            console.log('ws connect', action.payload.ws)
            break
    }
    return next(action)
}

export const LoginMiddleware = (storeApi: any) => (next: any) => (action: any) => {
    const state = storeApi.getState() // correctly typed as RootState
    // const dispatch = storeApi.dispatch
    switch (action.type) {
        case LOGGED_IN:
            localStorage.setItem('login', action.payload)
            console.log('auth logged in', action.payload)
            break
        case LOGGED_OUT:
            localStorage.setItem('login', 'null')
            state.websocket.ws.send(JSON.stringify({type: 'logOut'}))
            console.log('auth logged out', action.payload)
            break
    }
    return next(action)
}