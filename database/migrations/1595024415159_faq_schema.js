'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaqSchema extends Schema {
  up () {
    this.create('faqs', (table) => {
      table.increments()
      table.string('question', 100)
      table.string('description', 500)
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.timestamps()
    })
  }

  down () {
    this.drop('faqs')
  }
}

module.exports = FaqSchema
