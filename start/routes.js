'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('teacher', 'TeacherController.store').validator('TeacherStore')
Route.post('login', 'TeacherController.login')
Route.get('teacher/:id', 'TeacherController.show')

Route.get('course', 'CourseController.index')
Route.get('course/:id', 'CourseController.show')

Route.group('/' , ()=>{
  Route.put('teacher/:id', 'TeacherController.update')
  Route.delete('teacher/:id', 'TeacherController.destroy')
  Route.get('get_user', 'TeacherController.getUser')
  Route.get('logout', 'TeacherController.logout')

  Route.post('course', 'CourseController.store')
  Route.put('course/:id', 'CourseController.update')
  Route.delete('course/:id', 'CourseController.destroy')
}).middleware('auth')




// Route.resource('teacher', 'TeacherController').apiOnly()
// Route.resource('course', 'CourseController').apiOnly()