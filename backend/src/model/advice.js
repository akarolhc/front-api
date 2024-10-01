const database = require("../config/database");

class AdviceModel {
    constructor() {
        this.model = database.db.define("advice", {
            id: {
                type: database.db.Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
        });
    }
}