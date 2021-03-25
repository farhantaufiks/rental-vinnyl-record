'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVinnyl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static getDay(borrow_date, return_date){
      let firstDate = new Date(borrow_date)
      let secondDate = new Date(return_date)
      let diffday = Math.round(Math.abs((secondDate-firstDate) / 86400000));
      // return diffday
      return diffday
    }
  };
  UserVinnyl.init({
    UserId: DataTypes.INTEGER,
    VinnylMusicId: DataTypes.INTEGER,
    borrow_date: DataTypes.DATE,
    return_date: DataTypes.DATE,
    day_borrow: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'UserVinnyl',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.day_borrow = +(UserVinnyl.getDay(instance.borrow_date, instance.return_date))
      },
    },
  });
  return UserVinnyl;
};