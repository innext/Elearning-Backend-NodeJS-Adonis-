'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VideoSchema extends Schema {
  up () {
    this.create('videos', (table) => {
      table.increments()
      table.string('title', 100)
      table.time('duration')
      table.string('video', 40)
      table.integer('theme_id').unsigned().references('id').inTable('themes')
      table.timestamps()
    })
  }

  down () {
    this.drop('videos')
  }
}

module.exports = VideoSchema
