'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {
    static get table(){
        return 'courses'
    }
    static get hidden(){
        return ['created_at','updated_at']
    }

    teacher (){
        return this.belongsTo('App/Models/Teacher')
    }
    theme () {
        return this.hasMany('App/Models/Theme')
    }
    faq () {
        return this.hasMany('App/Models/Faq')
    }
}

module.exports = Course
