'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Please enter a business ID',
        },
        isInt: {
          msg: 'Business ID must be an integer',
        },
      },
    },
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
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide an amount',
        },
        isDecimal: {
          msg: 'Amount must be a decimal number',
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a price',
        },
        isDecimal: {
          msg: 'Price must be a decimal number',
        },
      },
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Please specify if in stock.',
        },
      },
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
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
  return Product;
};
