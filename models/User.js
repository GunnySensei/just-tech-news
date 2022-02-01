const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

//create User model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//define table columns and config
User.init(
  {
    //define an id column
    id: {
      //use special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //same as NOT NULL in sql
      allowNull: false,
      //instruct this is Primary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //no duplicate email values
      unique: true,
      //if allowNull is false, can run data through validation
      validate: {
        isEmail: true,
      },
    },
    //define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //pass must be at least 4 char long
        len: [4],
      },
    },
  },
  {
    hooks: {
      //set up beforeCreat lifecycle 'hook' functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //set up beforeUpdate lifecycle 'hook' functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    //TABLE CONFIG OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)

    //pass in imported conection (direct connection to database)
    sequelize,
    //don't auto create createdAt/updatedAt timestamp fields
    timestamps: false,
    //don't pluralize name of db table
    freezeTableName: true,
    //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    //make it so our model name stays lowercase in the db
    modelName: "user",
  }
);

module.exports = User;
