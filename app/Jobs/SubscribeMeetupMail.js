'use strict'

const Mail = use('Mail')
const moment = require('moment')

class SubscribeMeetupMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'SubscribeMeetupMail-job'
  }

  // This is where the work is done.
  async handle ({ email, username, title, location, date }) {
    try {
      const dateString = moment(date).format('MM-DD-YYYY')
      const timeString = moment(date).format('HH:mm')

      await Mail.send(
        'emails.subscribe_meetup',
        {
          username,
          title,
          location,
          dateString,
          timeString
        },
        message => {
          message
            .to(email)
            .from('meetapp@webmaster.com')
            .subject('Meetapp Subscribe')
        }
      )
    } catch (error) {
      return error
    }
  }
}

module.exports = SubscribeMeetupMail
