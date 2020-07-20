'use strict'

const Teacher = use('App/Models/Teacher')

class TeacherController {
  
  async index ({ request, response }) {

    let input = request.all()
    if(input.buscar != undefined){
      return await Teacher.query().where('user', input.buscar).orWhere('firstname', 'like','%'+ input.buscar +'%').fetch()
    }
    return Teacher.all()
  }

  async store ({ request, response }) {
    let input = request.all()

    await Teacher.create(input)

    return this.login(...arguments)
  }

  async show ({ params }) {
    return await Teacher.findBy('user',params.id)
  }

  async update ({ params, request, response }) {
    try{
      let  teacher = await Teacher.findByOrFail('user',params.id)
      let input = request.all()

      const avatar = request.file('avatar', {
        types: ['image'],
        size: '2mb'
      })
  
      const nombre_archivo = params.id + "." + avatar.extname
      const ubicacion_archivo = "public/images/" + nombre_archivo
      await avatar.move('public/images', {
        name: nombre_archivo,
        overwrite: true
      })
  
      if(!avatar.move()){
        return response.status(422).send({
          res: false,
          message: avatar.error()
        })
      }
      teacher.user = input.user
      teacher.password = input.password
      teacher.email = input.email
      teacher.firstname = input.firstname
      teacher.lastname = input.lastname
      teacher.avatar = ubicacion_archivo

      await teacher.save()

      return response.json({
        rer: true,
        message: 'Registro modificado correctamente.'
        
      })
    }catch(error){
      return response.json({
        rer: true,
        message: 'Ocurrio un error: ' + error.message
        
      })
    }
  }
  async destroy ({ params, response }) {

    let  teacher = await Teacher.findByOrFail('user',params.id)
    await teacher.delete()
    
    return response.json({
      rer:true,
      message:"Registro eliminado correctamente"
    })

  }

  // async cargarFoto({request, response, params}){
  //   try{

  //     const avatar = request.file('avatar', {
  //       types: ['image'],
  //       size: '2mb'
  //     })
  
  //     const nombre_archivo = params.id+"."+avatar.extname
  
  //     await avatar.move('.public/images', {
  //       name: nombre_archivo,
  //       overwrite: true
  //     })
  
  //     if(!avatar.move()){
  //       return response.status(422).send({
  //         res: false,
  //         message: avatar.error()
  //       })
  //     }
  
  //     let  teacher = await Teacher.findByOrFail('user',params.id)
  //     teacher.avatar = nombre_archivo
  //     await teacher.save()
  
  //     return response.json({
  //       res: true,
  //       message: 'Imagen registrada correctamente'
  //     })

  //   }catch(error){
  //     return response.json({
  //       rer: true,
  //       message: 'Ocurrio un error: ' + error.message
        
  //     })
  //   }
    
  // }
  
  async login({ request, response, auth }){
    let {user, password} = request.all()

    try{
      if(await auth.attempt(user, password)){
        let teacher = await Teacher.findBy('user', user)
        let token = await auth.generate(teacher)
      
      
      return response.json({
        teacher: teacher,
        token: token
      })
    }
    }catch(error){
      return response.json({
              rer: true,
              message: 'Ocurrio un error: ' + error.message
              
      })
    }
  }
  async getUser({ auth }){
    try{
      return await auth.getUser()
    }catch(error){
      return response.json({
        rer: true,
        message: 'Ocurrio un error: ' + error.message
      })
    }
  }
  async logout({ auth, response }){
    try{
      return auth.token().options({
        expiresIn: 20
      })
    }catch(error){
      return response.json({
        rer: true,
        message: 'Ocurrio un error: ' + error.message
      })
    }
  }

}

module.exports = TeacherController
