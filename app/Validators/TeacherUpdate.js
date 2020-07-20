'use strict'

class TeacherUpdate {
  get rules () {
    return {
      // validation rules
      // 'user': 'min:5|max:80|unique:teachers,user',
      'password': 'min:5|max:65',
      'firstname': 'min:3|max:30',
      'lastname': 'min:3|max:50',
      // 'email': 'unique:teachers,email|email'
    }
  }
  get messages(){
    return {
      // 'user.min': 'Su nombre de usuario debe tener minimo 5 caracteres.',
      // 'user.max': 'Su nombre de usuario debe tener maximo 80 caracteres.',
      // 'user.unique': 'El nombre de usuario que ingreso ya existe.',
      'password.min':'La contraseña debe tener minimo 5 caracteres.',
      'password.max':'La contraseña debe tener maximo 65 caracteres.',
      'firstname.min': 'Su nombre debe tener como minimo 3 caracteres.',
      'firstname.max': 'Su nombre debe tener como maximo 30 caracteres.',
      'lastname.min': 'Su apellido debe tener como minimo 3 caracteres.',
      'lastname.max': 'Su apellido debe tener como maximo 50 caracteres.',
      // 'email.unique': 'El correo que ingreso ya existe.',
      // 'email.email': 'Ingrese un correo valido.',
      
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = TeacherUpdate
