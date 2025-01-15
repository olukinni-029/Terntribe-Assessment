const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: false,
});

const Cause = require("./Cause")(sequelize);
const Contribution = require("./Contribution")(sequelize);

// Define relationships
Cause.hasMany(Contribution, { foreignKey: "cause_id", onDelete: "CASCADE", onUpdate: "CASCADE" });
Contribution.belongsTo(Cause, { foreignKey: "cause_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = { sequelize, Cause, Contribution };
