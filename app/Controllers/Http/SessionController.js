'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    const user = await User.findByOrFail('email', email)
    await user.load('preferences', builder => builder.select('id', 'title'))

    return { ...token, user: user.toJSON() }
  }
}

module.exports = SessionController
