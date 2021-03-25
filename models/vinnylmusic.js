'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VinnylMusic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VinnylMusic.belongsToMany(models.User, { through: "UserVinnyl" })
    }
    Rating(){
      if (this.restriction_age <= 10){
        return "Everyone"
      } else if(this.restriction_age <= 13){
        return "PG13"
      } else if(this.restriction_age <= 17){
        return "Teens"
      } else {
        return "Adult"
      }
    }
  };
  VinnylMusic.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    singer: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    cover_url: DataTypes.STRING,
    restriction_age: DataTypes.INTEGER,
    price_perday: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VinnylMusic',
  });
  return VinnylMusic;
};