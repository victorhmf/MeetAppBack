'use strict'

const Antl = use('Antl')

class FileStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      file: 'file'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = FileStore
