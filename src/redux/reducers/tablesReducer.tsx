import {
    SET_PHONE_TABLE_DATA,
    SET_PHONE_TABLE_ROW,
    REMOVE_PHONE_TABLE_ROW,
    CREATE_PHONE_TABLE_ROW,
    SET_ACCOUNT_TABLE_DATA,
    SET_ACCOUNT_TABLE_ROW,
    REMOVE_ACCOUNT_TABLE_ROW,
    CREATE_ACCOUNT_TABLE_ROW, SET_CROSSES_TABLE_DATA, SET_CROSSES_TABLE_ROW,
} from "../constants/action-types";

const tablesInitialState = {
    phonesTableData: {areas: {}, phones: []},
    accountsTableData: {accounts: []},
    crossesTableData: {crosst: []},
};

export const tablesReducer = (state = {...tablesInitialState}, action: {
    type: string,
    payload: any
}) => {
    switch (action.type) {
        case SET_PHONE_TABLE_DATA:
            return Object.assign({}, state, {
                phonesTableData: action.payload
            })
        case SET_PHONE_TABLE_ROW: {
            const copy = JSON.parse(JSON.stringify(state.phonesTableData))
            copy.phones = action.payload
            return Object.assign({}, state, {
                phonesTableData: copy
            })
        }
        case REMOVE_PHONE_TABLE_ROW: {
            const copy = JSON.parse(JSON.stringify(state.phonesTableData))
            copy.phones = action.payload
            return Object.assign({}, state, {
                phonesTableData: copy
            })
        }
        case CREATE_PHONE_TABLE_ROW:
            return Object.assign({}, state, {
                phonesTableData: action.payload
            })

        case SET_ACCOUNT_TABLE_DATA:
            return Object.assign({}, state, {
                accountsTableData: action.payload
            })
        case SET_ACCOUNT_TABLE_ROW: {
            const copy = JSON.parse(JSON.stringify(state.accountsTableData))
            copy.phones = action.payload
            return Object.assign({}, state, {
                accountsTableData: copy
            })
        }
        case REMOVE_ACCOUNT_TABLE_ROW: {
            const copy = JSON.parse(JSON.stringify(state.accountsTableData))
            copy.phones = action.payload
            return Object.assign({}, state, {
                accountsTableData: copy
            })
        }
        case CREATE_ACCOUNT_TABLE_ROW:
            return Object.assign({}, state, {
                accountsTableData: action.payload
            })

        case SET_CROSSES_TABLE_DATA:
            return Object.assign({}, state, {
                crossesTableData: action.payload
            })
        case SET_CROSSES_TABLE_ROW: {
            const copy = JSON.parse(JSON.stringify(state.crossesTableData))
            copy.phones = action.payload
            return Object.assign({}, state, {
                crossesTableData: copy
            })
        }

        default:
            return state
    }
}