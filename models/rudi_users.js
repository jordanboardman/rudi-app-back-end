'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rudi_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rudi_users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rudi_users',
  });
  return rudi_users;
};