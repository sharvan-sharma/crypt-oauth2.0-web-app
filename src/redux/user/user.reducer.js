import userActionTypes from './user.types'

const INITIAL_STATE = {
    logged_in: false,
    name: {
        firstname: null,
        middlename: null,
        lastname: null
    },
    username: null,
    email: null,
    transaction_id:null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return ({
                ...state,
                logged_in: action.payload.logged_in,
                name: action.payload.name,
                username: action.payload.username,
                email: action.payload.email,
                transaction_id:action.payload.transaction_id
            })
        default:
            return state
    }
}

export default userReducer