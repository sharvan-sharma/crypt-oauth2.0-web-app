import transactionActionTypes from './transaction.types'

const setTransaction = (transaction_id)=>({
    type:transactionActionTypes.SET_TRANSACTION,
    payload:transaction_id
})

export {setTransaction}