'use strict'

/*
|--------------------------------------------------------------------------
| CourseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CourseSeeder {
  static async run () {
    await Database.table('courses').insert([
      {
        "name": "Node JS de 0 a 100",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image": "public/images/courseNode JS de 0 a 100.jpg",
        "teacher_id": 1,
        "category_id": 1
    }
    ])
  }
}

module.exports = CourseSeeder
