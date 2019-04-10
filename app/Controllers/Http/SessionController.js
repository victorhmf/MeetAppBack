'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const userQuery = await User.query()
      .where('email', email)
      .with('preferences')
      .fetch()

    const [user] = userQuery.toJSON()

    return { ...token, user }
  }
}

module.exports = SessionController
