const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserRoutine extends Model {}

UserRoutine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    routine_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "routine",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_routine",
  }
);

module.exports = UserRoutine;
