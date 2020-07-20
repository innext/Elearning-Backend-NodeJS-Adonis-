'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ElementoNoEncontradoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Elemento no encontrado.'
    })
  }
}

module.exports = ElementoNoEncontradoException
