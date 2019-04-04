'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meetup extends Model {
  users () {
    return this.belongsToMany('App/Models/User').pivotModel(
      'App/Models/MeetupUser'
    )
  }

  preferences () {
    return this.belongsToMany('App/Models/Preference')
  }

  file () {
    return this.hasOne('App/Models/File')
  }
}

module.exports = Meetup
