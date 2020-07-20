'use strict'

const AccesoProhibidoException = use('App/Exceptions/AccesoProhibidoException')
const ElementoNoEncontradoException = use('App/Exceptions/ElementoNoEncontradoException')
class AuthorizationService{
    verificarPermiso(recurso, teacher){

        if(!recurso){
          throw new ElementoNoEncontradoException()
        }

        if(recurso.teacher_id !== teacher.id){
        throw new AccesoProhibidoException()
      }
    }
}

module.exports = new AuthorizationService()