'use strict'

const Antl = use('Antl')

class FileStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      file: 'file|file_ext:png,jpg,jpeg|file_size:2mb|file_types:image'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = FileStore
