'use strict'

const Course = use('App/Models/Course')
const AuthorizationService = use('App/Services/AuthorizationService')

class CourseController {
  async index ({ auth, response }) {
    try{
      const teacher = await auth.getUser()
      return await teacher.courses().fetch()
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }

  async store ({ request, response, auth }) {
    try{
      const teacher = await auth.getUser()

      let {name, description, category_id} = request.all()
      const image = request.file('image', {
        types: ['image'],
        size: '2mb'
      })
    
      const nombre_archivo = name + "." + image.extname
      const ubicacion_archivo = "public/images/course" + nombre_archivo

      await image.move('public/images/course', {
        name: nombre_archivo,
        overwrite: true
      })
    
      if(!image.move()){
        return response.status(422).send({
          res: false,
          message: image.error()
        })
      }

      const course = new Course()
      course.fill({
        name,
        description,
        image : ubicacion_archivo,
        category_id
      })

      await teacher.courses().save(course)

      return response.json({
        rer: true,
        message: 'Registro insertado correctamente.'
        
      })
    } catch (error) {
      response.json({
        error: 'Ocurrio un error: ' + error
      })
    }
  }

  async show ({ params }) {
    return await Course.findBy('name',params.id)
  }

  async update ({ params, request, response, auth }) {
    try{
      const teacher = await auth.getUser()

      let course = await Course.findByOrFail('id',params.id)
      let input = request.all()

      AuthorizationService.verificarPermiso(course,teacher) 
      
      const image = (input.image) ? request.file('image', {
        types: ['image'],
        size: '2mb'
      }): course.image
      if(image != course.image){
        
    
        let nombre_archivo = input.name + "." + image.extname
        var ubicacion_archivo = "public/images/course" + nombre_archivo
        await image.move('public/images/course', {
          name: nombre_archivo,
          overwrite: true
        })
    
        if(!image.move()){
          return response.status(422).send({
            res: false,
            message: image.error()
          })
        }
      }
      let ubicacion_image = (image != course.image) ? ubicacion_archivo: course.image
      course.merge({
        name : input.name,
        description : input.description,
        image : ubicacion_image,
        category_id : input.category_id
      })

      await course.save()

      return response.json({
        rer: true,
        message: 'Curso modificado correctamente.'
        
      })
    }catch(error){
      return response.json({
        rer: true,
        message: 'Ocurrio un error: ' + error
        
      })
    }
  }

  async destroy ({ params, response, auth }) {
    
    const teacher = await auth.getUser()
    const { id } = params
    const course = await Course.find(id)

    AuthorizationService.verificarPermiso(course,teacher)
    
    await course.delete()

    return response.json({
      message: 'Acabas de borrar el siguiente curso',
      course: course
    })

  }
    
}

module.exports = CourseController
