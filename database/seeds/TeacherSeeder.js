'use strict'

/*
|--------------------------------------------------------------------------
| TeacherSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class TeacherSeeder {
  static async run () {
    await Database.table('teachers').insert([
      {
        'user':'jair7_14',
        'password': '$2a$10$BcLrIDjnOe1pAjQi/cRsx.scaJBpZrHMMWp14idqtWrbgU2DHZUsm',//12345
        'email': 'jair7_14@hotmail.com',
        'firstname': 'Jair Eduard',
        'lastname': 'Paredes Gil',
        'avatar': './public/images/jair7_14.jpg'
      },
      {
        'user':'sangaselu',
        'password': '$2a$10$BcLrIDjnOe1pAjQi/cRsx.scaJBpZrHMMWp14idqtWrbgU2DHZUsm',//12345
        'email': 'sandra.seminario@outlook.com',
        'firstname': 'Sandra Gabriela',
        'lastname': 'Semiario Lujan',
        'avatar': './public/images/sangaselu.jpg'
      }
    ])
  }
}

module.exports = TeacherSeeder
