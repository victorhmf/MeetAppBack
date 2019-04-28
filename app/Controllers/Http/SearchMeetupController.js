'use strict'

const Meetup = use('App/Models/Meetup')

class SearchMeetupController {
  async index ({ request, response }) {
    const { title } = request.get()

    if (title) {
      const meetup = await Meetup.query()
        .where({ title })
        .withCount('users as members')
        .with('file', builder => builder.select('id'))
        .fetch()

      if (!meetup.toJSON().length) {
        return response.status(404).send()
      }

      return meetup
    }
  }
}

module.exports = SearchMeetupController
