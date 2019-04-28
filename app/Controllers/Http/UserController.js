'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async update ({ request, response, auth, params }) {
    const user = await User.findOrFail(params.id)

    if (auth.user.id !== user.id) {
      return response.status(401).send()
    }

    const { preferences, ...data } = request.only([
      'username',
      'password',
      'preferences',
      'firstLogin'
    ])

    user.merge(data)
    await user.save()

    if (preferences) {
      await user.preferences().sync(preferences)
    }
    
    await user.load('preferences')

    return user
  }
}

module.exports = UserController
