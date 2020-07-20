'use strict'

const Course = use('App/Models/Course')
const Theme = use('App/Models/Theme')
const Video = use('App/Models/Video')
const AuthorizationService = use('App/Services/AuthorizationService')

class VideoController {
    async show({ request, params, auth}){
        const teacher = await auth.getUser()
        const {id} = params
        const theme = await Theme.find(id)
        const course = await theme.course().fetch()
        AuthorizationService.verificarPermiso(course,teacher)

        return await theme.video().fetch()
    }

    async store({ auth, request, response, params}){
        const teacher = await auth.getUser()
        const {id} = params
        const theme = await Theme.find(id)
        const course = await theme.course().fetch()
        AuthorizationService.verificarPermiso(course,teacher)

        let {title} = request.all()

        const video = request.file('video', {
            types: ['video'],
            size: '300mb'
        })
    
        const nombre_archivo = title + "." + video.extname
        const ubicacion_archivo = "public/videos/course" + nombre_archivo
        await video.move('public/videos/course', {
        name: nombre_archivo,
        overwrite: true
        })
    
        if(!video.move()){
        return response.status(422).send({
            res: false,
            message: video.error()
        })
        }
        const video_video = new Video()
        video_video.fill({
        title,
        video : ubicacion_archivo
        })
        await theme.video().save(video_video)

        return response.json({
            message: 'Video creado correctamente'
        })
    }

    async update ({ request, params, response, auth }) {
    
        const teacher = await auth.getUser()
        const {id} = params
        const input = request.all()
        const video = await Video.find(id)
        const theme = await video.theme().fetch()
        const course = await theme.course().fetch()
        AuthorizationService.verificarPermiso(course,teacher)

        const video_new = (input.video) ? request.file('video', {
            types: ['video'],
            size: '300mb'
        }): video.video

        if(video_new != video.video){        
    
            let nombre_archivo = input.title + "." + video_new.extname
            var ubicacion_archivo = "public/video/course" + nombre_archivo
            await video_new.move('public/video/course', {
                name: nombre_archivo,
                overwrite: true
            })
        
            if(!video_new.move()){
                return response.status(422).send({
                res: false,
                message: video_new.error()
                })
            }
        }
        let ubicacion_video = (video_new != video.video) ? ubicacion_archivo: video.video

        video.merge({
            title : input.title,
            video : ubicacion_video
        })

        await video.save()
    
        return response.json({
          message: 'Acabas de actualizar el siguiente video',
          video: video.title
        })
    
      }

    async destroy ({ params, response, auth }) {
    
        const teacher = await auth.getUser()
        const {id} = params
        const video = await Video.find(id)
        const theme = await video.theme().fetch()
        const course = await theme.course().fetch()
        AuthorizationService.verificarPermiso(course,teacher)
        
        await video.delete()
    
        return response.json({
          message: 'Acabas de borrar el siguiente video:',
          course: video.title
        })
    
      }
}

module.exports = VideoController
