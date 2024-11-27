const { Sequelize } = require("sequelize")
require('dotenv').config()

class database {
    constructor(){
        this.init()
    }
    init(){
        this.db = new Sequelize({
            dialect: process.env.DB_DIALECT,
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            // dialectOptions: {
            //   ssl: {
            //     require: true,
            //     rejectUnauthorized: false
            //   }}
          });
        }
      }

module.exports = new database;