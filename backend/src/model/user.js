const database = require("../config/database");

class UserModel {
  constructor() {
    this.model = database.db.define("users", {
      id: {
        type: database.db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: database.db.Sequelize.STRING
      },
      email: {
        type: database.db.Sequelize.STRING,
        unique: true,
      },
      password: {
        type: database.db.Sequelize.STRING,
        allowNull: false
      },
      situacao:{
        type: database.db.Sequelize.ENUM('ativo', 'inativo'),
        defaultValue: 'ativo'
      } ,
      role: {
        type: database.db.Sequelize.ENUM('admin', 'viewer'),
        allowNull: false
      }
    });
  }
}
module.exports = new UserModel().model;
