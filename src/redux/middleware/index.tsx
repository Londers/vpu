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
    createAccountTableRow,
    createPhoneTableRow,
    loggedIn,
    loginError,
    removeAccountTableRow,
    removePhoneTableRow,
    setAccountTableData,
    setAccountTableRow,
    setCrossesTableData,
    setCrossesTableRow,
    setLogsTableData,
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
                case 'logout':
                    document.cookie = ''
                    console.log('logout', data.data)
                    break

                case 'createPhone':
                    dispatch(createPhoneTableRow(data.data))
                    console.log('createPhone', data.data)
                    break
                case 'phoneTable':
                    dispatch(setPhoneTableData(data.data))
                    console.log('phoneTable', data.data)
                    break
                case 'updatePhone':
                    dispatch(setPhoneTableRow(data.data.phones))
                    console.log('updatePhone', data.data.phones)
                    break
                case 'removePhone':
                    dispatch(removePhoneTableRow(data.data))
                    console.log('removePhone', data.data)
                    break

                case 'createAccount':
                    dispatch(createAccountTableRow(data.data))
                    console.log('createAcc', data.data)
                    break
                case 'getAccounts':
                    dispatch(setAccountTableData(data.data))
                    console.log('accTable', data.data)
                    break
                case 'updateAccount':
                    dispatch(setAccountTableRow(data.data))
                    console.log('updateAcc', data.data)
                    break
                case 'removeAccount':
                    dispatch(removeAccountTableRow(data.data))
                    console.log('removeAcc', data.data)
                    break

                case 'getCrosses':
                    dispatch(setCrossesTableData(data.data))
                    console.log('getCrosses', data.data)
                    break
                case 'updateCross':
                    dispatch(setCrossesTableRow(data.data))
                    console.log('updateCross', data.data)
                    break

                case 'getLogs':
                    dispatch(setLogsTableData(data.data))
                    console.log('getLogs', data.data)
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