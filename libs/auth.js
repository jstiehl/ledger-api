import DataStore from '../DataStore'

let auth = {
  userStatus(req, res, next) {
    let db = DataStore.db
    let token = req.headers['authorization-ledger']
    let session = db.sessions[token] && db.sessions[token].accessToken
    //if token is valid continue
    if (token && session && token == session){

      return next()

    } else {
      return next({
        message: "Not Authorized",
        status: 403
      })
    }
  },
  //needs to run after userStatus check
  userOwnsAccount(req, res, next) {
    let db = DataStore.db
    let token = req.headers['authorization-ledger']
    let username = db.sessions[token] && db.sessions[token].username
    let accountBeingUpdated = req.params.id

    let user = db.users[username]
    let userAccount = db.users[username] && db.users[username].accountId
    if(accountBeingUpdated === userAccount) {
      return next()
    } else {
     return next({
        message: `Not Your Account ${username}`,
        status: 403
      }) 
    }

  }
}

export default auth