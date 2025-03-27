'use strict';
const {
  Model
} = require('sequelize');
const authService = require("../../services/internal/auth.service");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a name',
        },
        len: {
          args: [1, 50],
          msg: 'Name must be between 1 and 50 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        notNull: {
          msg: 'Please enter your email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a name',
        },
        len: {
          args: [8, 10],
          msg: 'Name must be between 8 and 10 characters long',
        },
      },
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter a rol',
        },
        len: {
          args: [3, 20],
          msg: 'Rol must be between 1 and 20 characters long',
        },
      },
    },
    itIsVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Please specify if the user is verified.',
        },
      },
      defaultValue: 0,
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
    tableName: 'Users',
    scopes: {
      raw: {
        raw: true,
        nest: true,
      },
      desc: {
        order: [['createdAt', 'desc']],
      },
    },
  });
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await authService.hashPassword(user.password);
    user.password = hashedPassword;
  });
  return User;
};