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
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Nama Tidak Boleh Kosong"}
      }
    },
    KTP: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "KTP/ Nomor Identitas Tidak Boleh Kosong"}
      }
    },
    age:  {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "Umur Tidak Boleh Kosong"},
        min: 13 
      }
    },
  }, {
    sequelize,
    modelName: 'DetailUser',
    hooks: {
      beforeCreate: (user, options) => {
        user.mood = 'happy';
      },
    },
  });
  return DetailUser;
};