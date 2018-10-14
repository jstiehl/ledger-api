import DataStore from '../DataStore'

let handlers = {
  createAccount(req, res, next) {
    /*
      Expecting payload to contain, username, password
    */
    let db = DataStore.db
    let { username, password } = req.body
    let accountId = Math.floor(Math.random()*100000)
    //would probably want to check for an already existing username and not allow that
    db.users[username] = {
      password: password, //in practice would want to encrypt this
      accountId: accountId
    }

    db.accounts[accountId] = {
      currentBalance: 0,
      transactionHistory: []
    }
    let token = "asdfasdfasdfasdfasd" + Math.floor(Math.random()*66666666)
    db.sessions[token] = {accessToken: token, username}
    //initial account setup. hence the default balance and empty transaction history
    let responseBody = { accessToken: token }

    res.send(responseBody)
  },

  login(req, res, next) {
    let db = DataStore.db
    let { username, password } = req.body
    if(db.users[username] && db.users[username].password === password) {
      let token = "asdfasdfasdfasdfasd" + Math.floor(Math.random()*66666666)
      db.sessions[token] = {accessToken: token, username }
      res.send({accessToken: token})
    } else {
      res.status = 403
      res.send("invalid login")
      //error handling would go here for invalid login
    }
  },

  getUserInfo(req, res, next) {
    let db = DataStore.db
    let username = req.params.username
    let userAccountId = db.users[username].accountId
    let accountInfo = db.accounts[userAccountId]
    let response = { 
      accountId: userAccountId,
      currentBalance: accountInfo.currentBalance, 
      transactionHistory: accountInfo.transactionHistory
    }
    res.send(response)
  }
}

export default handlers

/*
  create user
  curl -XPOST -H "Content-type: application/json" -d '{"password":"Password","username":"Gymbeaux"}' 'http://localhost:5000/v1/users'

  login
  curl -XPOST -H "Content-type: application/json" -d '{"password":"Password","username":"Gymbeaux"}' 'http://localhost:5000/v1/users/login'

  getUserInfo
  curl -XGET 'http://localhost:5000/v1/users/Gymbeaux'
*/
