const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Cause", {
    title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    description: { type: DataTypes.TEXT },
    imageUrl: { type: DataTypes.TEXT },
  });
};
