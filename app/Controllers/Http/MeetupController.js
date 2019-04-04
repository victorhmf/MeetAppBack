'use strict'

const Meetup = use('App/Models/Meetup')

/**
 * Resourceful controller for interacting with meetups
 */
class MeetupController {
  /**
   * Show a list of all meetups.
   * GET meetups
   *
   */
  async index ({ request, response, view }) {}

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
  async show ({ params, request, response, view }) {}

  /**
   * Update meetup details.
   * PUT or PATCH meetups/:id
   *
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a meetup with id.
   * DELETE meetups/:id
   *
   */
  async destroy ({ params, request, response }) {}
}

module.exports = MeetupController
