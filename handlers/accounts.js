import DataStore from '../DataStore'
import moment from 'moment'
let handlers = {
  postTransaction(req, res, next) {
    let db = DataStore.db
    let { transactionType, transactionAmount } = req.body
    let transactionDate = moment().format()
    let accountId = req.params.id
    let account = db.accounts[accountId]
    let transactions = account.transactionHistory
    let newBalance = transactionType === "deposit" ? account.currentBalance + parseInt(transactionAmount) : account.currentBalance - parseInt(transactionAmount)
    transactions.push({ transactionType, transactionAmount, transactionDate, balance: newBalance })
    //update account details
    db.accounts[accountId].currentBalance = newBalance
    db.accounts[accountId].transactionHistory = transactions
    res.send(db.accounts[accountId])
  }
}

export default handlers

/* 
curl -XPOST -H 'authorization-ledger: abcdefg' -H "Content-type: application/json" -d '{"transactionType":"deposit","transactionAmount":500}' 'http://localhost:5000/v1/accounts/abc12345'
*/