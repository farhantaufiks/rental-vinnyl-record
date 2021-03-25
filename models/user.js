'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.DetailUser)
      User.belongsToMany(models.VinnylMusic, {
        through: 'UserVinnyl'
      })
    }
  };
  User.init({
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Status Pengguna Harus dipilih"}
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "username Tidak Boleh Kosong"}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "password Tidak Boleh Kosong"}
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "alamat email Tidak Boleh Kosong"}
      }
    },
    DetailUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};