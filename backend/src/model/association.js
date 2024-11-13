const Advice = require("./advice");
const UserAdvice = require("./user_advice");
const User = require("./user");

Advice.hasMany(UserAdvice, { foreignKey: 'adviceId', as: 'user_advice', onDelete: 'CASCADE' });
UserAdvice.belongsTo(Advice, { foreignKey: 'adviceId', as: 'advice' });
User.hasMany(UserAdvice, { foreignKey: 'userId', as: 'user_advice', onDelete: 'CASCADE' });
UserAdvice.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 