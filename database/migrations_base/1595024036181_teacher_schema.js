'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeacherSchema extends Schema {
  up () {
    this.table('teachers', (table) => {
      // alter table
      table.string('avatar', 40).alter();
    })
  }

  down () {
    this.table('teachers', (table) => {
      // reverse alternations
      table.string('avatar', 20).alter();
    })
  }
}

module.exports = TeacherSchema
