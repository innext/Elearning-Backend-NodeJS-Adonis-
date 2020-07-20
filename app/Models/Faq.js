'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Faq extends Model {
    static get table(){
        return 'faqs'
    }
    static get hidden(){
        return ['created_at','updated_at','password']
    }
    course (){
        return this.belongsTo('App/Models/Course')
    }
}

module.exports = Faq
