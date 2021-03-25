'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailUser.hasOne(models.User)
    }
  };
  DetailUser.init({
    status: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    KTP: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailUser',
  });
  return DetailUser;
};