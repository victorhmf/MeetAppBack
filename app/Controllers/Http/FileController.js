'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   */
  async store ({ request, response }) {
    if (!request.file('file')) return

    const upload = request.file('file', {
      size: '2mb',
      types: ['image'],
      extnames: ['jpg', 'png', 'jpeg']
    })
    const fileName = `${Date.now()}.${upload.subtype}`

    await upload.move(Helpers.tmpPath('uploads'), {
      name: fileName
    })

    if (!upload.moved()) {
      return response.status(400).send({ error: upload.error() })
    }

    const file = await File.create({
      file: fileName,
      name: upload.clientName,
      type: upload.type,
      subtype: upload.subtype
    })

    return file
  }
}

module.exports = FileController
