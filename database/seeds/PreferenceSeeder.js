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
    await Preference.create({ title: 'Front-end' })
    await Preference.create({ title: 'Back-end' })
    await Preference.create({ title: 'Mobile' })
    await Preference.create({ title: 'DevOps' })
    await Preference.create({ title: 'Gestão' })
    await Preference.create({ title: 'Marketing' })
  }
}

module.exports = PreferenceSeeder
