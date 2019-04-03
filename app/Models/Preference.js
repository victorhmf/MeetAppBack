'use strict'

const Model = use('Model')

class Preference extends Model {
  users () {
    return this.belongsToMany('App/Models/User')
  }

  meetups () {
    return this.belongsToMany('App/Models/Meetup')
  }
}

module.exports = Preference
