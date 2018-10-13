/*
  Data Store for ledger API. In practice you would use a db for storing this data.
  NOTE: Since this is functioning as the data store for the API, there will be NO PERSISTENCE of data
*/

const DataStore = {
  db: null,

  init: callback => {
    if(!DataStore.db) {
      DataStore.db = {
        //User will have an id, name, username, password (in practice this should be encrypted or use an auth service),
        // and an account ID (realistically would want multi account support)
        users: {
          Gymbeaux: {
            password: "Password",
            accountId: "abc12345"
          }
        },
        //account id, current balance, transaction history array
        accounts: {
          abc12345: {
            currentBalance: 0,
            transactionHistory: []
          } 
        },
        sessions: {
          abcdefg: {
            accessToken: "abcdefg",
            username: "Gymbeaux"
          }
        }
      }
    }

    return callback()
  }
}

export default DataStore