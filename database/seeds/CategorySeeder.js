'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class CategorySeeder {
  static async run () {
    await Database.table('categories').insert([
      {
        'category':'Desarrollo Web'
      },
      {
        'category':'Aplicaciones Moviles'
      },
      {
        'category':'Ciencia de Datos'
      }
    ])
  }
}

module.exports = CategorySeeder
