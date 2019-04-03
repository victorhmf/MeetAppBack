'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupPreferenceSchema extends Schema {
  up () {
    this.create('meetup_preference', table => {
      table.increments()
      table
        .integer('preference_id')
        .unsigned()
        .references('id')
        .inTable('preferences')
        .onUpdate('cascade')
        .onDelete('cascade')
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetup_preference')
  }
}

module.exports = MeetupPreferenceSchema
