'use strict'

const Antl = use('Antl')
const { rule } = use('Validator')

class MeetupStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'string|required',
      description: 'string|required',
      date: [
        rule('dateFormat', 'YYYY-MM-DD HH:mm'),
        rule('required'),
        rule('after', new Date())
      ],
      location: 'string|required',
      preferences: 'array|min:1|max:6|required',
      'preferences.*': 'range:0,7'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = MeetupStore
