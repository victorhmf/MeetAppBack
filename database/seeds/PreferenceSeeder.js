/* eslint-disable no-return-await */
'use strict'

/*
|--------------------------------------------------------------------------
| PreferenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Preference = use('App/Models/Preference')

class PreferenceSeeder {
  async run () {
    const preferences = [
      'Front-end',
      'Back-end',
      'Mobile',
      'DevOps',
      'Gestão',
      'Marketing'
    ]

    await Promise.all(
      preferences.map(
        async preference => await Preference.create({ title: preference })
      )
    )
  }
}

module.exports = PreferenceSeeder
