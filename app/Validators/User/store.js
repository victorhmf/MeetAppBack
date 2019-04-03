'use strict'

const Antl = use('Antl')

class UserStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users',
      username: 'required|unique:users',
      password: 'required|min:6'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserStore
