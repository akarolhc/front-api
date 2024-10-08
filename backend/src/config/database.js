const { Sequelize } = require("sequelize")

class database {
    constructor(){
        this.init()
    }
    init(){
        this.db = new Sequelize({
            database: "exemplo",
            host: "127.0.0.1",
            username: "root",
            port: 3306,
            password: "",
            dialect: "mysql"
        })
    }
}

module.exports = new database;