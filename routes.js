// dependencies ------------------------------------

import express from 'express'
import accounts from './handlers/accounts'
import users from './handlers/users'

import auth from './libs/auth'

const routes = [
  //Accounts
  {
    method: 'post',
    url: '/accounts/:id',
    middleware: [auth.userStatus, auth.userOwnsAccount],
    handler: accounts.postTransaction,
  },
  //Users
  {
    method: 'post',
    url: '/users',
    middleware: [],
    handler: users.createAccount,
  },
  {
    method: 'post',
    url: '/users/login',
    middleware: [],
    handler: users.login,
  },
  {
    method: 'get',
    url: '/users/:username',
    middleware: [auth.userStatus],
    handler: users.getUserInfo,
  }
]

// initialize routes -------------------------------

const router = express.Router()

for (const route of routes) {
  let arr = route.hasOwnProperty('middleware') ? route.middleware : []
  arr.unshift(route.url)
  arr.push(route.handler)
  router[route.method].apply(router, arr)
}

// export ------------------------------------------

export default router