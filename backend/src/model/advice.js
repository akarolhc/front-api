const database = require("../config/database");
const advice = require("../controller/advice");

class AdviceModel {
    constructor() {
        this.model = database.db.define("advices", {
            id: {
                type: database.db.Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            advice: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            }
        });
    }
}
module.exports = new AdviceModel().model;