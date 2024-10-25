const database = require("../config/database");
const advice = require("../controller/advice");

class AdviceModel {
    constructor() {
        this.model = database.db.define("advice", {
            id: {
                type: database.db.Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            advice: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        });
    }
}
module.exports = new AdviceModel().model;