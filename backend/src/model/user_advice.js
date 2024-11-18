const database = require("../config/database");
const advice = require("../controller/advice");

class AdviceModel {
    constructor() {
        this.model = database.db.define("users_advices", {
            id: {
                type: database.db.Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            adviceId: {
                type: database.db.Sequelize.INTEGER,
                references: {
                    model: 'advices',
                    key: 'id'
                }
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