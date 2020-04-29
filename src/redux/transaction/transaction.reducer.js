import transactionActionTypes from './transaction.types'

const INITIAL_STATE = {
    transaction_id:null
}

const transactionReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case transactionActionTypes.SET_TRANSACTION :return ({...state,transaction_id:action.payload})
        default :return state
    }
}

export default transactionReducer