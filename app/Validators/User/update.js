'use strict'

const Antl = use('Antl')

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'unique:users',
      password: 'confirmed|min:6',
      preferences: 'array|min:1|max:6',
      'preferences.*': 'range:0,7'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
