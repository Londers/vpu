import {SET_PHONE_TABLE_DATA} from "../constants/action-types";


const tablesInitialState = {
    phoneTableData: {}
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
        default:
            return state
    }
}