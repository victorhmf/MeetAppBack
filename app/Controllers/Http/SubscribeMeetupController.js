'use strict'

const Meetup = use('App/Models/Meetup')
const Mail = use('Mail')

class SubscribeMeetupController {
  /**
   * Create/save a new meetup subscription.
   * POST meetups
   *
   */
  async store ({ response, params, auth }) {
    const meetup = await Meetup.findOrFail(params.id)

    // if (meetup.user_id === auth.user.id) {
    //   return response
    //     .status(400)
    //     .send({ error: { message: 'Meetup owner can not subscribe it' } })
    // }

    await meetup.users().attach(auth.user.id)

    await Mail.send(
      'emails.subscribe_meetup',
      {
        username: auth.user.username,
        title: meetup.title,
        location: meetup.location,
        date: meetup.date
      },
      message => {
        message
          .to(auth.user.email)
          .from('meetapp@webmaster.com')
          .subject('Meetapp Subscribe')
      }
    )

    return response.status(200).send()
  }
}

module.exports = SubscribeMeetupController
