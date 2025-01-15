const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Contribution", {
    name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 0.01 } },
  });
};
