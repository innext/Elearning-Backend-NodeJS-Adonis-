'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeacherSchema extends Schema {
  up () {
    this.create('teachers', (table) => {
      table.increments()
      table.string('user', 80).notNullable().unique()
      table.string('password', 65).notNullable()
      table.string('email', 50).notNullable().unique()
      table.string('firstname', 30)
      table.string('lastname', 50)
      table.string('avatar', 40)
      table.timestamps()
    })
  }

  down () {
    this.drop('teachers')
  }
}

module.exports = TeacherSchema
