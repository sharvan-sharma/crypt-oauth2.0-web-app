import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import projectReducer from './project/project.reducer'
import transactionReducer from './transaction/transaction.reducer'

export default combineReducers({
    user:userReducer,
    project:projectReducer,
    transaction:transactionReducer
})