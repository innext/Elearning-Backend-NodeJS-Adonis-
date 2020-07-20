'use strict'

class TeacherStore {
  get rules () {
    return {
      // validation rules
      'user': 'required|min:5|max:80|unique:teachers,user',
      'password': 'required|min:5|max:65',
      'email': 'required|unique:teachers,email|email'
    }
  }
  get messages(){
    return {
      'user.required': 'Debe ingresar su nombre de usuario.',
      'user.min': 'Su nombre de usuario debe tener minimo 5 caracteres.',
      'user.max': 'Su nombre de usuario debe tener maximo 80 caracteres.',
      'user.unique': 'El nombre de usuario que ingreso ya existe.',
      'password.required': 'Debe ingresar su contraseña.',
      'email.required': 'Debe ingresar su correo.',
      'email.unique': 'El correo que ingreso ya existe.',
      'email.email': 'Ingrese un correo valido'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = TeacherStore
