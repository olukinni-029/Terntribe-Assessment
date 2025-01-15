const { sequelize } = require("../models/index.model");

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error.message);
    process.exit(1);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error.message);
  }
};

const closeDatabaseConnection = async () => {
  try {
    await sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing database connection:", error.message);
  }
};

module.exports = { testDatabaseConnection, syncDatabase, closeDatabaseConnection };
