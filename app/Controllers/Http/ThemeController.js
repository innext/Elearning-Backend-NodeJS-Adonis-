'use strict'

const Course = use('App/Models/Course')
const Theme = use('App/Models/Theme')
const AuthorizationService = use('App/Services/AuthorizationService')

class ThemeController {

    async show({ request, params, auth}){
        const teacher = await auth.getUser()
        const {id} = params
        const course = await Course.find(id)
        AuthorizationService.verificarPermiso(course,teacher)

        return await course.theme().fetch()
    }

    async store({ auth, request, response, params}){
        const teacher = await auth.getUser()
        const {title, description} = request.all()
        const {id} = params
        const course = await Course.find(id)
        AuthorizationService.verificarPermiso(course,teacher)

        const theme = new Theme()
        theme.fill({
            title,
            description
        })

        await course.theme().save(theme)

        return response.json({
            message: 'Tema creado correctamente'
        })
    }

    async update ({ request, params, response, auth }) {
    
        const teacher = await auth.getUser()
        const { id } = params
        const theme = await Theme.find(id)
        const course = await theme.course().fetch()
        let input = request.all()
    
        AuthorizationService.verificarPermiso(course,teacher)
        
        theme.merge({
            title : input.title,
            description : input.description
          })
        
        await theme.save()
    
        return response.json({
          message: 'Acabas de actualizar el siguiente tema',
          tema: theme.title
        })
    
      }

    async destroy ({ params, response, auth }) {
    
        const teacher = await auth.getUser()
        const { id } = params
        const theme = await Theme.find(id)
        const course = await theme.course().fetch()
    
        AuthorizationService.verificarPermiso(course,teacher)
        
        await theme.delete()
    
        return response.json({
          message: 'Acabas de borrar el siguiente tema',
          course: theme.title
        })
    
      }
}

module.exports = ThemeController
