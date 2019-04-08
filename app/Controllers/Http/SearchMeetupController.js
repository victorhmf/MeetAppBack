'use strict'

const Meetup = use('App/Models/Meetup')

class SearchMeetupController {
  async index ({ request }) {
    const { title } = request.get()

    if (title) {
      const meetup = await Meetup.query()
        .where({ title })
        .withCount('users')
        .fetch()

      return meetup
    }
  }
}

module.exports = SearchMeetupController
