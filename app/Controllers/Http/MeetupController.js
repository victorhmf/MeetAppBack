'use strict'

const Meetup = use('App/Models/Meetup')
const File = use('App/Models/File')

/**
 * Resourceful controller for interacting with meetups
 */
class MeetupController {
  /**
   * Show a list of all meetups.
   * GET meetups
   *
   */
  async index ({ request, response, auth }) {
    const { filter } = request.get()

    await auth.user.load('preferences')
    const userPreferences = auth.user
      .getRelated('preferences')
      .toJSON()
      .map(preference => preference.id)

    const meetups = await Meetup.query()
      .where(function () {
        switch (filter) {
          case 'notsubscribed':
            this.whereDoesntHave('users', builder => {
              builder.where({ user_id: auth.user.id })
            })
            break
          case 'subscribed':
            this.whereHas('users', builder => {
              builder.where({ user_id: auth.user.id })
            })
            break
          case 'recommended':
            this.whereDoesntHave('users', builder => {
              builder.where({ user_id: auth.user.id })
            }).whereHas('preferences', builder => {
              builder.whereIn('preference_id', userPreferences)
            })
            break
        }
      })
      .with('preferences')
      .fetch()

    return meetups
  }

  /**
   * Create/save a new meetup.
   * POST meetups
   *
   */
  async store ({ request, response, auth }) {
    const { preferences, ...data } = request.only([
      'title',
      'description',
      'location',
      'date',
      'preferences',
      'file_id'
    ])

    const meetup = await Meetup.create({ ...data, user_id: auth.user.id })

    if (preferences) {
      await meetup.preferences().attach(preferences)
      await meetup.load('preferences')
    }

    return meetup
  }

  /**
   * Display a single meetup.
   * GET meetups/:id
   *
   */
  async show ({ params }) {
    const meetupQuery = await Meetup.query()
      .where({ id: params.id })
      .withCount('users')
      .fetch()

    const [meetup] = meetupQuery.toJSON()
    const file = await File.findOrFail(meetup.file_id)

    return { ...meetup, file_url: file.toJSON().url }
  }
}

module.exports = MeetupController
