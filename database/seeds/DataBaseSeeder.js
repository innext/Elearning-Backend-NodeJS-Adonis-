'use strict'

/*
|--------------------------------------------------------------------------
| DataBaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const TeacherSeeder = use('./TeacherSeeder')
const CategorySeeder = require('./CategorySeeder')
const CourseSeeder = require('./CourseSeeder')

class DataBaseSeeder {
  async run () {
    await TeacherSeeder.run()
    await CategorySeeder.run()
    await CourseSeeder.run()
  }
}

module.exports = DataBaseSeeder
