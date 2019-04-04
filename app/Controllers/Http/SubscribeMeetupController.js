'use strict'

const Meetup = use('App/Models/Meetup')
const MeetupUser = use('App/Models/MeetupUser')
const Job = use('App/Jobs/SubscribeMeetupMail')
const Kue = use('Kue')

class SubscribeMeetupController {
  /**
   * Create/save a new meetup subscription.
   * POST meetups
   *
   */

  async store ({ response, params, auth }) {
    const meetup = await Meetup.findOrFail(params.id)

    if (meetup.user_id === auth.user.id) {
      return response
        .status(400)
        .send({ error: { message: 'Meetup owner can not subscribe it' } })
    }

    const meetupUser = await MeetupUser.query()
      .where({
        user_id: auth.user.id,
        meetup_id: meetup.id
      })
      .fetch()

    if (meetupUser.rows.length) {
      return response.status(400).send({
        error: { message: 'You are already subscribed to this meetup ' }
      })
    }

    await meetup.users().attach(auth.user.id)

    const { title, location, date } = meetup
    const { email, username } = auth.user

    Kue.dispatch(Job.key, { title, location, date, email, username })

    return response.status(200).send()
  }
}

module.exports = SubscribeMeetupController
