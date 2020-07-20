'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Theme extends Model {

    static get table(){
        return 'themes'
    }
    static get hidden(){
        return ['created_at','updated_at','password']
    }
    course (){
        return this.belongsTo('App/Models/Course')
    }
    video () {
        return this.hasMany('App/Models/Video')
    }
}

module.exports = Theme
