'use strict'

class UserStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users',
      username: 'required|unique:users',
      password: 'required'
    }
  }
}

module.exports = UserStore
