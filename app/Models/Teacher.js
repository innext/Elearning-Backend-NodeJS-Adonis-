'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Teacher extends Model {
    static get table(){
        return 'teachers'
    }
    static get hidden(){
        return ['created_at','updated_at','password']
    }
    static boot () {
        super.boot()
    
        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {
          if (userInstance.dirty.password) {
            userInstance.password = await Hash.make(userInstance.password)
          }
        })
      }
    courses () {
      return this.hasMany('App/Models/Course')
    }
}

module.exports = Teacher