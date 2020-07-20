'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThemeSchema extends Schema {
  up () {
    this.create('themes', (table) => {
      table.increments()
      table.string('title', 100)
      table.string('description', 500)
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.timestamps()
    })
  }

  down () {
    this.drop('themes')
  }
}

module.exports = ThemeSchema
