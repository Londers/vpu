import {
    CREATE_PHONE_TABLE_ROW,
    REMOVE_PHONE_TABLE_ROW,
    SET_PHONE_TABLE_DATA,
    SET_PHONE_TABLE_ROW
} from "../constants/action-types";

const tablesInitialState = {
    phoneTableData: {areas: {}, phones: []}
};

export const tablesReducer = (state = {...tablesInitialState}, action: {
    type: string,
    payload: any
}) => {
    switch (action.type) {
        case SET_PHONE_TABLE_DATA:
            return Object.assign({}, state, {
                phoneTableData: action.payload
            })
        case SET_PHONE_TABLE_ROW: {
            const copy = JSON.parse(JSON.stringify(state.phoneTableData))
            copy.phones = action.payload
            return Object.assign({}, state, {
                phoneTableData: copy
            })
        }
        case REMOVE_PHONE_TABLE_ROW: {
            const copy = JSON.parse(JSON.stringify(state.phoneTableData))
            copy.phones = action.payload
            return Object.assign({}, state, {
                phoneTableData: copy
            })
        }
        case CREATE_PHONE_TABLE_ROW:
            return Object.assign({}, state, {
                phoneTableData: action.payload
            })
        default:
            return state
    }
}