'use strict'

const Schema = use('Schema')

class AddFirstLoginToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.boolean('firstLogin').defaultTo(true)
    })
  }

  down () {
    this.alter('users', (table) => {
      table.dropColumn('firstLogin')
    })
  }
}

module.exports = AddFirstLoginToUsersSchema
