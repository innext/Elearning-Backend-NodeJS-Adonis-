'use strict'

const Route = use('Route')

Route.post('teacher', 'TeacherController.store').validator('TeacherStore')
Route.post('login', 'TeacherController.login')
Route.get('teacher/:id', 'TeacherController.show')

Route.get('course', 'CourseController.index')
Route.get('course/:id', 'CourseController.show')

Route.group('/' , ()=>{
  //Rutas para Teacher
  Route.get('get_user', 'TeacherController.getUser')
  Route.get('logout', 'TeacherController.logout')
  Route.put('teacher/:id', 'TeacherController.update')
  Route.delete('teacher/:id', 'TeacherController.destroy')
  
  //Rutas para Course
  Route.post('course', 'CourseController.store')
  Route.put('course/:id', 'CourseController.update')
  Route.delete('course/:id', 'CourseController.destroy')

  //Rutas para Theme
  Route.get('course/:id/theme', 'ThemeController.show')
  Route.post('course/:id/theme', 'ThemeController.store')
  Route.put('course/theme/:id', 'ThemeController.update')
  Route.delete('course/theme/:id', 'ThemeController.destroy')

  //Rutas para FAQ
  Route.get('course/:id/faq', 'FaqController.show')
  Route.post('course/:id/faq', 'FaqController.store')  
  Route.put('course/faq/:id', 'FaqController.update')
  Route.delete('course/faq/:id', 'FaqController.destroy')

  //Rutas para FAQ
  Route.get('course/theme/:id/video', 'VideoController.show')
  Route.post('course/theme/:id/video', 'VideoController.store')  
  Route.put('course/theme/video/:id', 'VideoController.update')
  Route.delete('course/theme/video/:id', 'VideoController.destroy')
}).middleware('auth')




// Route.resource('teacher', 'TeacherController').apiOnly()
// Route.resource('course', 'CourseController').apiOnly()