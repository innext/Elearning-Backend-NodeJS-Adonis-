'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Video extends Model {
    static get table(){
        return 'videos'
    }
    static get hidden(){
        return ['created_at','updated_at','password']
    }
    theme (){
        return this.belongsTo('App/Models/Theme')
    }
}

module.exports = Video
