'use strict'
const Course = use('App/Models/Course')
const Faq = use('App/Models/Faq')
const AuthorizationService = use('App/Services/AuthorizationService')

class FaqController {
    async show({ request, params, auth}){
        const teacher = await auth.getUser()
        const {id} = params
        const course = await Course.find(id)
        AuthorizationService.verificarPermiso(course,teacher)

        return await course.faq().fetch()
    }

    async store({ auth, request, response, params}){
        const teacher = await auth.getUser()
        const {question, description} = request.all()
        const {id} = params
        const course = await Course.find(id)
        AuthorizationService.verificarPermiso(course,teacher)

        const faq = new Faq()
        faq.fill({
            question,
            description
        })

        await course.faq().save(faq)

        return response.json({
            message: 'Pregunta creada correctamente'
        })
    }

    async update ({ request, params, response, auth }) {
    
        const teacher = await auth.getUser()
        const { id } = params
        const faq = await Faq.find(id)
        const course = await faq.course().fetch()
        let input = request.all()
    
        AuthorizationService.verificarPermiso(course,teacher)
        
        faq.merge({
            question : input.question,
            description : input.description
          })
        
        await faq.save()
    
        return response.json({
          message: 'Acabas de actualizar la siguiente pregunta',
          tema: faq.question
        })
    
      }

    async destroy ({ params, response, auth }) {
    
        const teacher = await auth.getUser()
        const { id } = params
        const faq = await Faq.find(id)
        const course = await faq.course().fetch()
    
        AuthorizationService.verificarPermiso(course,teacher)
        
        await faq.delete()
    
        return response.json({
          message: 'Acabas de borrar la siguiente pregunta',
          course: faq.question
        })
    
      }
}

module.exports = FaqController
