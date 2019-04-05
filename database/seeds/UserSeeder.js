/* eslint-disable no-return-await */
'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const users = [
      {
        username: 'User 1',
        email: 'user1@gmail.com',
        password: '123456'
      },
      {
        username: 'User 2',
        email: 'user2@gmail.com',
        password: '123456'
      },
      {
        username: 'User 3',
        email: 'user3@gmail.com',
        password: '123456'
      },
      {
        username: 'User 4',
        email: 'user4@gmail.com',
        password: '123456'
      }
    ]

    await Promise.all(users.map(async user => await User.create(user)))
  }
}

module.exports = UserSeeder
